/* 문서 사이트 동작 — 상태: 실험. 외부 요청 없음. 저장은 이 브라우저의 localStorage뿐이다. */
(function () {
  'use strict';
  var root = document.documentElement;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  /* 화면 밝기: 기기 설정 → 밝게 → 어둡게 */
  var THEME_KEY = 'mds.theme';
  var themeBtn = document.querySelector('[data-theme-btn]');
  var names = { auto: '기기 설정', light: '밝게', dark: '어둡게' };
  function applyTheme(t) {
    if (t === 'light' || t === 'dark') root.setAttribute('data-theme', t); else root.removeAttribute('data-theme');
    if (themeBtn) themeBtn.textContent = '화면: ' + names[t || 'auto'];
    paintTokens();
  }
  if (themeBtn) {
    themeBtn.hidden = false;
    themeBtn.addEventListener('click', function () {
      var cur = root.getAttribute('data-theme') || 'auto';
      var next = cur === 'auto' ? 'light' : cur === 'light' ? 'dark' : 'auto';
      if (next === 'auto') store.del(THEME_KEY); else store.set(THEME_KEY, next);
      applyTheme(next);
    });
  }

  /* 토큰 값 표시: CSS에서 실제 계산된 값을 읽어 적는다 */
  function paintTokens() {
    var cs = getComputedStyle(root);
    document.querySelectorAll('[data-token]').forEach(function (el) {
      var v = cs.getPropertyValue(el.getAttribute('data-token')).trim();
      if (v) el.textContent = v;
    });
  }
  applyTheme(store.get(THEME_KEY) || 'auto');
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) mq.addEventListener('change', paintTokens);
  }

  /* 선택 행 → 상세 패널 */
  document.querySelectorAll('[data-md]').forEach(function (md) {
    var rows = Array.prototype.slice.call(md.querySelectorAll('.sel-row'));
    var panel = md.querySelector('.detail');
    var sheet = md.querySelector('dialog.sheet');
    var sheetPanel = sheet ? sheet.querySelector('.detail') : null;
    var live = md.querySelector('[data-live]');
    var narrow = window.matchMedia('(max-width: 760px)');
    var origin = null;
    var emptyHTML = panel.innerHTML;
    var usable = rows.filter(function (r) { return !r.disabled; });

    function body(row) {
      var tpl = document.getElementById(row.getAttribute('data-detail'));
      var wrap = document.createElement('div');
      wrap.className = 'detail-body';
      wrap.appendChild(tpl.content.cloneNode(true));
      var close = document.createElement('p');
      close.className = 'close-row';
      close.innerHTML = '<button type="button" class="btn quiet" data-close>닫고 목록으로 <span aria-hidden="true">(Esc)</span></button>';
      wrap.appendChild(close);
      return wrap;
    }
    function mark(row) {
      rows.forEach(function (r) { if (r === row) r.setAttribute('aria-current', 'true'); else r.removeAttribute('aria-current'); });
    }
    function say(t) { if (live) live.textContent = t; }

    function open(row, moveFocus) {
      origin = row; mark(row);
      var name = row.querySelector('.name').textContent;
      if (narrow.matches && sheet && sheet.showModal) {
        sheetPanel.innerHTML = ''; sheetPanel.appendChild(body(row));
        if (!sheet.open) sheet.showModal();
        var h = sheetPanel.querySelector('h3'); if (h) { h.tabIndex = -1; h.focus(); }
      } else {
        panel.innerHTML = ''; panel.appendChild(body(row));
        var h2 = panel.querySelector('h3'); if (h2) h2.tabIndex = -1;
        if (moveFocus && h2) h2.focus();
      }
      say(name + ' 상세를 열었습니다.');
    }
    function close() {
      var back = origin;
      if (sheet && sheet.open) sheet.close();
      panel.innerHTML = emptyHTML;
      mark(null); origin = null;
      if (back) back.focus();
      say('상세를 닫고 목록으로 돌아왔습니다.');
    }

    rows.forEach(function (row) {
      row.addEventListener('click', function () {
        if (row.getAttribute('aria-current') === 'true' && !narrow.matches) { open(row, true); return; }
        open(row, false);
      });
      row.addEventListener('keydown', function (e) {
        var i = usable.indexOf(row), to = null;
        if (e.key === 'ArrowDown') to = usable[Math.min(i + 1, usable.length - 1)];
        else if (e.key === 'ArrowUp') to = usable[Math.max(i - 1, 0)];
        else if (e.key === 'Home') to = usable[0];
        else if (e.key === 'End') to = usable[usable.length - 1];
        else if (e.key === 'ArrowRight' && row.getAttribute('aria-current') === 'true') { e.preventDefault(); open(row, true); return; }
        else if (e.key === 'Escape' && origin) { e.preventDefault(); close(); return; }
        if (to) { e.preventDefault(); to.focus(); }
      });
    });
    md.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) close();
    });
    panel.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && origin) { e.preventDefault(); close(); }
    });
    if (sheet) {
      /* 기본 Esc 닫힘도 같은 경로로: 선택 해제 + 원래 행으로 포커스 */
      sheet.addEventListener('cancel', function (e) { e.preventDefault(); close(); });
      sheet.addEventListener('click', function (e) { if (e.target === sheet) close(); });
      sheet.addEventListener('keydown', function (e) { if (e.key === 'Escape') { e.preventDefault(); close(); } });
    }
    /* 화면 폭이 바뀌면 열린 상세를 맞는 자리로 옮긴다 */
    var onMode = function () { if (origin) { var r = origin; if (sheet && sheet.open) sheet.close(); open(r, false); } };
    if (narrow.addEventListener) narrow.addEventListener('change', onMode);
  });

  /* 질문 메모: 이 브라우저에만 저장 */
  var memos = Array.prototype.slice.call(document.querySelectorAll('[data-memo]'));
  if (memos.length) {
    var KEY = 'mds.memo.';
    var status = document.querySelector('[data-memo-status]');
    var tell = function (t) { if (status) status.textContent = t; };
    memos.forEach(function (ta) {
      var k = KEY + ta.getAttribute('data-memo');
      var v = store.get(k); if (v) ta.value = v;
      var timer;
      ta.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          var ok = ta.value ? store.set(k, ta.value) : (store.del(k), true);
          tell(ok ? '이 브라우저에 저장했습니다. 다른 기기·저장소에는 전달되지 않습니다.' : '저장하지 못했습니다(브라우저가 저장을 막음). 내용을 직접 복사해 두세요.');
        }, 400);
      });
    });
    var out = document.querySelector('[data-memo-out]');
    var collect = function () {
      var lines = ['# 디자인 시스템 질문 메모 (' + new Date().toISOString().slice(0, 10) + ')', ''];
      memos.forEach(function (ta) {
        if (!ta.value.trim()) return;
        lines.push('## ' + ta.getAttribute('data-memo').toUpperCase() + ' ' + (ta.getAttribute('data-title') || ''), ta.value.trim(), '');
      });
      return lines.length > 2 ? lines.join('\n') : '';
    };
    var exp = document.querySelector('[data-memo-export]');
    if (exp) exp.addEventListener('click', function () {
      var text = collect();
      if (!text) { tell('적어 둔 메모가 없습니다.'); return; }
      out.hidden = false; out.value = text; out.focus(); out.select();
      var done = function (ok) { tell(ok ? '메모를 글로 모아 클립보드에 복사했습니다. 붙여 넣어 전달해야 반영됩니다.' : '메모를 아래 칸에 모았습니다. 직접 복사해 전달하세요.'); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      else done(false);
    });
    var clr = document.querySelector('[data-memo-clear]');
    if (clr) clr.addEventListener('click', function () {
      if (!window.confirm('이 브라우저에 저장된 메모를 모두 지울까요? 되돌릴 수 없습니다.')) return;
      memos.forEach(function (ta) { store.del(KEY + ta.getAttribute('data-memo')); ta.value = ''; });
      if (out) { out.value = ''; out.hidden = true; }
      tell('이 브라우저의 메모를 지웠습니다.');
    });
  }
})();
