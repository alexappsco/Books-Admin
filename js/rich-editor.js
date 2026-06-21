function editorFormat(cmd, editorId, value) {
  const el = document.getElementById(editorId);
  el.focus();
  document.execCommand(cmd, false, value || null);
}

function editorToolbar(editorId) {
  const sep = '<span class="w-px h-6 bg-gray-300 mx-1 shrink-0"></span>';
  const btn = (cmd, icon, val) =>
    `<button type="button" onclick="editorFormat('${cmd}','${editorId}'${val ? `,'${val}'` : ''})" class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-600 shrink-0" title="${cmd}">${icon}</button>`;

  const icon = {
    bold: '<b class="text-sm font-bold">B</b>',
    italic: '<i class="text-sm italic">I</i>',
    underline: '<u class="text-sm">U</u>',
    strikeThrough: '<s class="text-sm">S</s>',
    justifyLeft: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M4 6h16M4 12h10M4 18h16"/></svg>',
    justifyCenter: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M4 6h16M7 12h10M4 18h16"/></svg>',
    justifyRight: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M4 6h16M10 12h10M4 18h16"/></svg>',
    justifyFull: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>',
    insertUnorderedList: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
    insertOrderedList: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M10 6h11M10 12h11M10 18h11M4 6h1v4M4 10h2M4 18h1v-2h2v2"/></svg>',
    createLink: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>',
    insertImage: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
  };

  return `<div class="flex flex-wrap items-center gap-1 p-2 bg-[#F9FAFB] border-b border-gray-200">
    <select onchange="editorFormat('fontName','${editorId}',this.value);this.selectedIndex=0" class="h-8 px-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-600 cursor-pointer">
      <option value="">Font</option><option>Public Sans</option><option>Arial</option><option>Tahoma</option>
    </select>
    <select onchange="editorFormat('fontSize','${editorId}',this.value);this.selectedIndex=0" class="h-8 px-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-600 cursor-pointer">
      <option value="">16px</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option>
    </select>
    <select class="h-8 px-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-600 cursor-pointer">
      <option>Normal</option><option>عريض</option>
    </select>
    ${sep}
    ${btn('bold', icon.bold)}${btn('italic', icon.italic)}${btn('underline', icon.underline)}${btn('strikeThrough', icon.strikeThrough)}
    ${sep}
    <input type="color" onchange="editorFormat('foreColor','${editorId}',this.value)" class="w-8 h-8 border border-gray-200 rounded cursor-pointer p-0.5" title="لون النص">
    <input type="color" onchange="editorFormat('hiliteColor','${editorId}',this.value)" value="#ffff00" class="w-8 h-8 border border-gray-200 rounded cursor-pointer p-0.5" title="لون الخلفية">
    ${sep}
    ${btn('justifyRight', icon.justifyRight)}${btn('justifyCenter', icon.justifyCenter)}${btn('justifyLeft', icon.justifyLeft)}${btn('justifyFull', icon.justifyFull)}
    ${sep}
    ${btn('insertUnorderedList', icon.insertUnorderedList)}${btn('insertOrderedList', icon.insertOrderedList)}
    ${sep}
    <button type="button" onclick="(function(){const u=prompt('أدخل الرابط:');if(u)editorFormat('createLink','${editorId}',u)})()" class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-600 shrink-0">${icon.createLink}</button>
    <button type="button" onclick="(function(){const u=prompt('أدخل رابط الصورة:');if(u)editorFormat('insertImage','${editorId}',u)})()" class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-600 shrink-0">${icon.insertImage}</button>
  </div>`;
}

function initEditor(editorId, dir) {
  const wrap = document.getElementById(editorId + 'Wrap');
  wrap.innerHTML = editorToolbar(editorId) +
    `<div id="${editorId}" contenteditable="true" dir="${dir}" class="min-h-[260px] p-5 text-[15px] leading-relaxed text-gray-700 outline-none focus:bg-white"></div>`;
}

function saveLegalContent() {
  const toast = document.getElementById('saveToast');
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2500);
}

function saveLegalContent() {
  document.getElementById('sidebar').classList.toggle('translate-x-full');
  document.getElementById('overlay').classList.toggle('hidden');
  document.body.classList.toggle('overflow-hidden');
}

function openLogoutModal() {
  const m = document.getElementById('logoutModal');
  m.classList.remove('hidden');
  m.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeLogoutModal() {
  const m = document.getElementById('logoutModal');
  m.classList.add('hidden');
  m.classList.remove('flex');
  document.body.style.overflow = 'auto';
}
