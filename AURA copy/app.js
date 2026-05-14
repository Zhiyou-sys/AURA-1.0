const state = {
  lang: 'zh', // 'zh' | 'en'
  mobileMenuOpen: false,
  legal: {
    open: false,
    doc: 'privacy', // 'privacy' | 'terms' | 'claim'
  },
  admin: {
    unlocked: false,
    unlockedAt: 0,
    unlockModalOpen: false,
    eggClicks: 0,
    eggLastAt: 0,
  },
  user: {
    displayName: '',
    phone: '',
    email: '',
  },
  // Dashboard demo state
  dashboard: {
    progress: 0,
    visitModalOpen: false,
    showAllClaimBookings: false,
    visitBookings: [
      { id: 1, date: '2026-03-20', time: '上午 (09:00 - 12:00)', count: 2, status: 'visited', plot: 'A01', note: '首次体验菜园，带 1 位朋友一同前来。' },
      { id: 2, date: '2026-03-28', time: '下午 (14:00 - 17:00)', count: 3, status: 'visited', plot: 'A01', note: '家人一起采收小番茄，并完成一次除草。' },
      { id: 3, date: '2026-04-05', time: '上午 (09:00 - 12:00)', count: 2, status: 'upcoming', plot: 'A01', note: '计划检查支架、追施一次有机肥。' },
    ],
    claimBookings: [],
    viewBookingModalOpen: false,
    viewBooking: null, // { kind: 'visit' | 'claim', data: {...} }
  },
  // Map selection demo state
  selectedPlotId: null,
  ui: {
    bookingSubmitPanel: null,
    plotBookModalOpen: false,
    plotBookModalPlotId: null,
    /** 从地块页进入认领页时：email | survey | null */
    bookingEntryMode: null,
  },
  /** 认领页表单（随地块切换重置） */
  bookingForm: {
    plotId: null,
    name: '',
    participants: 2,
    kidName: '',
    wantSeeds: false,
    seeds: [],
    toolPack: null,
    dayFri: false,
    daySat: false,
    daySun: false,
    timeSlot: '',
    agreed: false,
  },
};

const PLOTS = [
  {
    id: 'L1',
    name: '保育区 一',
    nameEn: 'Rehab Zone 1',
    size: 40,
    status: 'unavailable',
    tags: ['保育中'],
    tagsEn: ['Soil rehab'],
    image: 'https://images.unsplash.com/photo-1592424001815-581d4b6555cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '当前地块正在进行土壤养护，暂不可用。',
    descriptionEn: 'This plot is under soil rehabilitation and temporarily unavailable.',
  },
  {
    id: 'L2',
    name: '保育区 二',
    nameEn: 'Rehab Zone 2',
    size: 40,
    status: 'unavailable',
    tags: ['保育中'],
    tagsEn: ['Soil rehab'],
    image: 'https://images.unsplash.com/photo-1505929281313-05ec2f42a03f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '当前地块正在进行土壤养护，暂不可用。',
    descriptionEn: 'This plot is under soil rehabilitation and temporarily unavailable.',
  },
  {
    id: 'L3',
    name: '保育区 三',
    nameEn: 'Rehab Zone 3',
    size: 40,
    status: 'unavailable',
    tags: ['保育中'],
    tagsEn: ['Soil rehab'],
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '当前地块正在进行土壤养护，暂不可用。',
    descriptionEn: 'This plot is under soil rehabilitation and temporarily unavailable.',
  },
  {
    id: 'R1',
    name: '绿漪 R1 号',
    nameEn: 'Aura Plot R1',
    size: 15,
    status: 'available',
    tags: ['近水源', '新手友好'],
    tagsEn: ['Near water', 'Beginner-friendly'],
    image: 'https://images.unsplash.com/photo-1657383765722-1e2354dbba61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '位于右侧上方的优质地块，采光良好。',
    descriptionEn: 'A premium plot in the upper-right area with excellent sunlight.',
  },
  {
    id: 'R2',
    name: '绿漪 R2 号',
    nameEn: 'Aura Plot R2',
    size: 15,
    status: 'rented',
    tags: ['含种子套餐'],
    tagsEn: ['Seeds included'],
    image: 'https://images.unsplash.com/photo-1727099079513-952d40de9d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '该地块已被其他农场主认领。',
    descriptionEn: 'This plot has already been claimed by another grower.',
  },
  {
    id: 'R3',
    name: '绿漪 R3 号',
    nameEn: 'Aura Plot R3',
    size: 15,
    status: 'available',
    tags: ['深土层', '半遮阴'],
    tagsEn: ['Deep soil', 'Partial shade'],
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '右下角区域，适合种植根茎类蔬菜。',
    descriptionEn: 'Lower-right area—great for root vegetables.',
  },
  {
    id: 'R4',
    name: '绿漪 R4 号',
    nameEn: 'Aura Plot R4',
    size: 15,
    status: 'pending',
    tags: ['独立灌溉'],
    tagsEn: ['Private irrigation'],
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: '该地块正在等待确认中。',
    descriptionEn: 'This plot is pending confirmation.',
  },
];

function t(zh, en) {
  return state.lang === 'zh' ? zh : en;
}

function plotLabel(plot) {
  if (!plot) return '';
  return state.lang === 'zh' ? (plot.name || '') : (plot.nameEn || plot.name || '');
}

function plotTags(plot) {
  if (!plot) return [];
  if (state.lang === 'zh') return plot.tags || [];
  return plot.tagsEn || plot.tags || [];
}

function plotDesc(plot) {
  if (!plot) return '';
  return state.lang === 'zh'
    ? (plot.description || '')
    : (plot.descriptionEn || plot.description || '');
}

function h(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

/** 认领预约邮件收件人（用户默认邮件客户端） */
const CLAIM_INBOX_EMAIL = 'AURA@outlook.com';
/** 问卷星：家庭绿植体验等活动预约（与邮件二选一或同时填写） */
const BOOKING_SURVEY_URL = 'https://v.wjx.cn/vm/mIRIcaw.aspx';

const BOOKING_SEED_OPTIONS = [
  { code: 'bokchoy', zh: '小白菜', en: 'Bok choy' },
  { code: 'radish', zh: '白萝卜', en: 'White radish' },
  { code: 'cilantro', zh: '香菜', en: 'Cilantro' },
  { code: 'spinach', zh: '菠菜', en: 'Spinach' },
  { code: 'shepherd', zh: '荠菜', en: "Shepherd's purse" },
];

function seedOptionLabel(code) {
  const o = BOOKING_SEED_OPTIONS.find((x) => x.code === code);
  if (!o) return String(code || '');
  return state.lang === 'zh' ? o.zh : o.en;
}

function ensureBookingFormForPlot(rawId) {
  const upper = String(rawId || 'A01').toUpperCase();
  if (state.bookingForm.plotId !== upper) {
    state.bookingForm.plotId = upper;
    state.bookingForm.name = '';
    state.bookingForm.participants = 2;
    state.bookingForm.kidName = '';
    state.bookingForm.wantSeeds = false;
    state.bookingForm.seeds = [];
    state.bookingForm.toolPack = null;
    state.bookingForm.dayFri = false;
    state.bookingForm.daySat = false;
    state.bookingForm.daySun = false;
    state.bookingForm.timeSlot = '';
    state.bookingForm.agreed = false;
  }
}

function bookingPayloadSnapshot(plotUpper) {
  const bf = state.bookingForm;
  return {
    plotUpper,
    name: bf.name,
    participants: bf.participants,
    kidName: bf.kidName,
    wantSeeds: bf.wantSeeds,
    seedLabels: (bf.seeds || []).map(seedOptionLabel),
    toolPack: bf.toolPack,
    dayFri: bf.dayFri,
    daySat: bf.daySat,
    daySun: bf.daySun,
    timeSlot: bf.timeSlot,
  };
}

function buildClaimBookingMailPieces(plotUpper, p) {
  const isZh = state.lang === 'zh';
  const subject = isZh
    ? `绿漪认领预约 - 地块 ${plotUpper}`
    : `Aura garden claim - Plot ${plotUpper}`;

  const seedText = !p.wantSeeds
    ? (isZh ? '否' : 'No')
    : ((p.seedLabels && p.seedLabels.length)
      ? p.seedLabels.join(isZh ? '、' : ', ')
      : (isZh ? '是（尚未添加品种）' : 'Yes (no varieties added yet)'));

  const toolText = p.toolPack === 'yes'
    ? (isZh ? '需要' : 'Yes')
    : p.toolPack === 'no' ? (isZh ? '不需要' : 'No') : '—';

  const days = [];
  if (p.dayFri) days.push(isZh ? '周五' : 'Friday');
  if (p.daySat) days.push(isZh ? '周六' : 'Saturday');
  if (p.daySun) days.push(isZh ? '周日' : 'Sunday');
  const dayText = days.length ? days.join(isZh ? '、' : ', ') : (isZh ? '未选择' : 'None selected');

  const timeText = p.timeSlot === 'morning'
    ? (isZh ? '上午' : 'Morning')
    : p.timeSlot === 'afternoon'
      ? (isZh ? '下午' : 'Afternoon')
      : p.timeSlot === 'unsure'
        ? (isZh ? '不确定' : 'Unsure')
        : '—';

  const lines = [];
  if (isZh) {
    lines.push('您好，', '', '我想提交以下绿漪菜园认领/体验预约信息：', '');
    lines.push(`地块编号：绿漪 ${plotUpper}`);
    lines.push(`姓名：${p.name || '—'}`);
    lines.push(`参与人数：${p.participants}`);
    lines.push(`宝贝小名：${(p.kidName && String(p.kidName).trim()) || '—'}`);
    lines.push(`认领种子：${seedText}`);
    lines.push(`需要工具包：${toolText}`);
    lines.push(`种植日（周五/周六/周日，可多选）：${dayText}`);
    lines.push(`时间段：${timeText}`);
    lines.push('');
    if (state.user.displayName || state.user.phone || state.user.email) {
      lines.push('其他联系方式（如在设置中已填写）：');
      if (state.user.displayName) lines.push(`称呼：${state.user.displayName}`);
      if (state.user.phone) lines.push(`手机：${state.user.phone}`);
      if (state.user.email) lines.push(`邮箱：${state.user.email}`);
      lines.push('');
    }
    lines.push('请协助确认，谢谢！');
  } else {
    lines.push('Hello,', '', 'I would like to submit the following Aura garden booking:', '');
    lines.push(`Plot: Aura ${plotUpper}`);
    lines.push(`Name: ${p.name || '—'}`);
    lines.push(`Participants: ${p.participants}`);
    lines.push(`Child nickname: ${(p.kidName && String(p.kidName).trim()) || '—'}`);
    lines.push(`Claim seeds: ${seedText}`);
    lines.push(`Tool package: ${toolText}`);
    lines.push(`Planting days (Fri/Sat/Sun, multi): ${dayText}`);
    lines.push(`Time slot: ${timeText}`);
    lines.push('');
    if (state.user.displayName || state.user.phone || state.user.email) {
      lines.push('Other contact (if saved in settings):');
      if (state.user.displayName) lines.push(`Display name: ${state.user.displayName}`);
      if (state.user.phone) lines.push(`Phone: ${state.user.phone}`);
      if (state.user.email) lines.push(`Email: ${state.user.email}`);
      lines.push('');
    }
    lines.push('Please confirm when convenient. Thank you!');
  }

  const body = lines.join('\n');
  return { subject, body };
}

function buildClaimBookingFullCopyText(plotUpper, p) {
  const { subject, body } = buildClaimBookingMailPieces(plotUpper, p);
  const isZh = state.lang === 'zh';
  if (isZh) {
    return [
      `收件邮箱：${CLAIM_INBOX_EMAIL}`,
      `主题：${subject}`,
      '',
      '正文：',
      body,
      '',
      '---',
      `在线问卷（可选）：${BOOKING_SURVEY_URL}`,
    ].join('\n');
  }
  return [
    `To: ${CLAIM_INBOX_EMAIL}`,
    `Subject: ${subject}`,
    '',
    'Body:',
    body,
    '',
    '---',
    `Online survey (optional): ${BOOKING_SURVEY_URL}`,
  ].join('\n');
}

function openClaimBookingMailto(plotUpper, p) {
  const { subject, body } = buildClaimBookingMailPieces(plotUpper, p);
  const url = `mailto:${CLAIM_INBOX_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = url;
}

function bookingIsReadyToSubmit() {
  const bf = state.bookingForm;
  const agreeEl = document.getElementById('agree');
  const agreed = agreeEl instanceof HTMLInputElement ? agreeEl.checked : !!bf.agreed;
  const hasDay = bf.dayFri || bf.daySat || bf.daySun;
  const seedsOk = !bf.wantSeeds || ((bf.seeds || []).length > 0);
  return !!(
    agreed
    && (bf.name || '').trim()
    && bf.participants >= 1
    && bf.toolPack
    && hasDay
    && bf.timeSlot
    && seedsOk
  );
}

function updateConfirmBookingButton() {
  const btn = document.getElementById('confirm-booking');
  if (!btn) return;
  const ok = bookingIsReadyToSubmit();
  btn.disabled = !ok;
  btn.className = ok
    ? 'w-full py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all bg-[#2A2A2A] text-white hover:bg-black shadow-md'
    : 'w-full py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all bg-[#E8E2D9] text-[#8C867D] cursor-not-allowed';
}

async function copyTextToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {}
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {}
  return false;
}

const ADMIN_PASSPHRASE_SHA256 = '8e0db465f77e905af8b37f003a50eb9d96d799a43067672881bf8a68a366a8f0';

async function sha256Hex(input) {
  const data = new TextEncoder().encode(String(input ?? ''));
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function parseRoute() {
  const raw = (location.hash || '#/').slice(1); // "/..."
  const path = raw.startsWith('/') ? raw : `/${raw}`;

  const seg = path.split('/').filter(Boolean);
  if (seg.length === 0) return { name: 'home', params: {} };
  if (seg[0] === 'map') return { name: 'map', params: {} };
  if (seg[0] === 'dashboard' || seg[0] === 'visits') return { name: 'home', params: {} };
  if (seg[0] === 'settings') return { name: 'settings', params: {} };
  if (seg[0] === 'admin') return { name: 'admin', params: {} };
  if (seg[0] === 'plot' && seg[1]) return { name: 'plot', params: { id: seg[1] } };
  if (seg[0] === 'booking' && seg[1]) return { name: 'booking', params: { id: seg[1] } };
  return { name: 'home', params: {} };
}

function setLang(next) {
  state.lang = next;
  render();
}

// Dark mode has been removed in this demo.

function navLink(to, zh, en, isActive) {
  const cls = isActive ? 'text-[#87A96B]' : 'text-[#5A5A5A]';
  return `
    <a href="#${to}" class="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#87A96B] ${cls}">
      <span>${state.lang === 'zh' ? zh : en}</span>
    </a>
  `;
}

function persistUser() {
  try {
    localStorage.setItem('aura_user', JSON.stringify({
      displayName: state.user.displayName || '',
      phone: state.user.phone || '',
      email: state.user.email || '',
    }));
  } catch {}
}

function bookingDetailModal() {
  if (!state.dashboard.viewBookingModalOpen || !state.dashboard.viewBooking) return '';
  const vb = state.dashboard.viewBooking;
  const kind = vb.kind === 'claim' ? 'claim' : 'visit';
  const b = vb.data || {};
  const title =
    kind === 'visit'
      ? t('入场预约详情', 'Visit booking detail')
      : t('认领申请详情', 'Claim request detail');
  return `
    <div class="fixed inset-0 z-[96] flex items-center justify-center p-4">
      <div data-action="close-booking-detail" class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-md bg-white dark:bg-[#0F1511] rounded-3xl border border-[#E8E2D9] dark:border-[#22302A]/60 shadow-2xl overflow-hidden">
        <div class="p-6 sm:p-7 space-y-5">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-xl font-serif text-[#2A2A2A] dark:text-[#F3F4F6]">${title}</h3>
              <p class="text-xs text-[#5A5A5A] dark:text-[#B7C0BA] mt-1">
                ${kind === 'visit'
                  ? t('这是您在绿漪的入场预约记录，仅作为演示使用。', 'This is your visit booking record in Aura (demo only).')
                  : t('这是您提交的地块认领申请记录，仅作为演示使用。', 'This is your plot claim record (demo only).')}
              </p>
            </div>
            <button data-action="close-booking-detail" class="w-8 h-8 rounded-full bg-[#F5F0E8] dark:bg-[#17211B] text-[#5A5A5A] dark:text-[#B7C0BA] hover:bg-[#E8E2D9] dark:hover:bg-[#1E2A23] transition-colors text-sm">✕</button>
          </div>

          <div class="space-y-2 text-xs text-[#5A5A5A] dark:text-[#B7C0BA]">
            ${kind === 'claim' && b.claimVersion === 2
              ? `
            <div><span class="inline-block w-20 text-[#8C867D]">${t('地块', 'Plot')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(b.plot || 'A01')}</span></div>
            <div><span class="inline-block w-20 text-[#8C867D]">${t('姓名', 'Name')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(b.name || '')}</span></div>
            <div><span class="inline-block w-20 text-[#8C867D]">${t('人数', 'Guests')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(String(b.participants ?? ''))}</span></div>
            <div><span class="inline-block w-20 text-[#8C867D]">${t('宝贝小名', 'Kid')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml((b.kidName && String(b.kidName).trim()) || '—')}</span></div>
            <div><span class="inline-block w-20 text-[#8C867D]">${t('认领种子', 'Seeds')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(b.seedsLine || '—')}</span></div>
            <div><span class="inline-block w-20 text-[#8C867D]">${t('工具包', 'Tools')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(b.toolLine || '—')}</span></div>
            <div><span class="inline-block w-20 text-[#8C867D]">${t('种植日', 'Days')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(b.daysLine || '—')}</span></div>
            <div><span class="inline-block w-20 text-[#8C867D]">${t('时间段', 'Time')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(b.timeLabel || '—')}</span></div>
            `
              : `
            <div><span class="inline-block w-16 text-[#8C867D]">${t('日期', 'Date')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(b.date || '')}</span></div>
            ${kind === 'visit'
              ? `<div><span class="inline-block w-16 text-[#8C867D]">${t('时间段', 'Time')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(b.time || '')}</span></div>`
              : ''}
            <div><span class="inline-block w-16 text-[#8C867D]">${t('地块', 'Plot')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(b.plot || 'A01')}</span></div>
            ${kind === 'visit'
              ? `<div><span class="inline-block w-16 text-[#8C867D]">${t('人数', 'Guests')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(String(b.count ?? 0))}</span></div>`
              : `<div><span class="inline-block w-16 text-[#8C867D]">${t('种子套餐', 'Seeds')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(b.seed || t('未记录', 'Not recorded'))}</span></div>`}
            ${kind === 'claim'
              ? `<div><span class="inline-block w-16 text-[#8C867D]">${t('周期', 'Duration')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(b.duration || t('未记录', 'Not recorded'))}</span></div>`
              : ''}
            `}
            <div><span class="inline-block w-16 text-[#8C867D]">${t('状态', 'Status')}</span> <span class="font-medium text-[#2A2A2A] dark:text-[#F3F4F6]">
              ${kind === 'visit'
                ? (b.status === 'upcoming' ? t('待出行', 'Upcoming') : t('已完成', 'Completed'))
                : (b.status === 'pending' ? t('待确认', 'Pending') : t('已处理', 'Processed'))}
            </span></div>
          </div>

          <div class="pt-2 border-t border-[#E8E2D9] dark:border-[#22302A]/60">
            <div class="text-xs text-[#8C867D] dark:text-[#7C857F] mb-1">${t('备注', 'Notes')}</div>
            <p class="text-xs text-[#5A5A5A] dark:text-[#B7C0BA] leading-relaxed">
              ${escapeHtml(b.note || (kind === 'visit'
                ? t('本次入场预约暂无补充说明。', 'No additional notes for this visit.')
                : t('本次认领申请暂无补充说明。', 'No additional notes for this claim.')))}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function visitModal() {
  if (!state.dashboard.visitModalOpen) return '';
  return `
    <div class="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <div data-action="visit-close" class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-md bg-white dark:bg-[#0F1511] rounded-3xl border border-[#E8E2D9] dark:border-[#22302A]/60 shadow-2xl overflow-hidden">
        <div class="p-6 sm:p-7 space-y-5">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-xl font-serif text-[#2A2A2A] dark:text-[#F3F4F6]">${t('预约入场', 'Book a farm visit')}</h3>
              <p class="text-xs text-[#5A5A5A] dark:text-[#B7C0BA] mt-1">
                ${t('本预约仅选择入场时间，与地块认领无关。', 'This booking is only for visit time, separate from plot claiming.')}
              </p>
            </div>
            <button data-action="visit-close" class="w-8 h-8 rounded-full bg-[#F5F0E8] dark:bg-[#17211B] text-[#5A5A5A] dark:text-[#B7C0BA] hover:bg-[#E8E2D9] dark:hover:bg-[#1E2A23] transition-colors text-sm">✕</button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-xs text-[#5A5A5A] mb-1.5">${t('入场日期', 'Visit date')}</label>
              <input id="visit-date" type="text" placeholder="${t('例如：2026年4月6日（周一）', 'e.g. Apr 6, 2026 (Mon)')}" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] dark:bg-[#0B0F0C] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] text-sm transition-all" />
            </div>
            <div>
              <label class="block text-xs text-[#5A5A5A] mb-1.5">${t('时间段', 'Time slot')}</label>
              <select id="visit-slot" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] dark:bg-[#0B0F0C] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] text-sm transition-all">
                <option value="">${t('请选择时间段', 'Select a time slot')}</option>
                <option value="上午 (09:00 - 12:00)">${t('上午 (09:00 - 12:00)', 'Morning (09:00 - 12:00)')}</option>
                <option value="下午 (14:00 - 17:00)">${t('下午 (14:00 - 17:00)', 'Afternoon (14:00 - 17:00)')}</option>
                <option value="傍晚 (17:00 - 19:00)">${t('傍晚 (17:00 - 19:00)', 'Evening (17:00 - 19:00)')}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-[#5A5A5A] mb-1.5">${t('入场人数', 'Number of guests')}</label>
              <input id="visit-count" type="number" min="1" max="8" placeholder="${t('例如：2 人', 'e.g. 2')}" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] dark:bg-[#0B0F0C] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] text-sm transition-all" />
            </div>
            <div>
              <label class="block text-xs text-[#5A5A5A] mb-1.5">${t('备注（选填）', 'Notes (optional)')}</label>
              <textarea id="visit-note" rows="2" placeholder="${t('例如：携带 1 名儿童，需要简单讲解参观路线。', 'e.g. bringing 1 child, would like a quick tour.')}" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] dark:bg-[#0B0F0C] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] text-xs transition-all resize-none"></textarea>
            </div>
          </div>

          <button data-action="visit-submit" class="w-full py-3.5 rounded-full bg-[#87A96B] text-white text-sm font-medium hover:bg-[#76965B] transition-colors flex items-center justify-center gap-2">
            🗓️ ${t('提交入场预约', 'Submit visit booking')}
          </button>
        </div>
      </div>
    </div>
  `;
}

function adminUnlockModal() {
  if (!state.admin.unlockModalOpen) return '';
  return `
    <div class="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div data-action="admin-unlock-close" class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-md bg-white dark:bg-[#0F1511] rounded-3xl border border-[#E8E2D9] dark:border-[#22302A]/60 shadow-2xl overflow-hidden">
        <div class="p-6 sm:p-7">
          <div class="flex items-start justify-between gap-4 mb-5">
            <div>
              <h3 class="text-xl font-serif text-[#2A2A2A] dark:text-[#F3F4F6]">${t('输入口令', 'Enter passphrase')}</h3>
              <p class="text-sm text-[#5A5A5A] dark:text-[#B7C0BA] mt-1">${t('用于解锁隐藏管理区域。', 'Unlock the hidden admin area.')}</p>
            </div>
            <button data-action="admin-unlock-close" class="w-9 h-9 rounded-full bg-[#F5F0E8] dark:bg-[#17211B] text-[#5A5A5A] dark:text-[#B7C0BA] hover:bg-[#E8E2D9] dark:hover:bg-[#1E2A23] transition-colors">✕</button>
          </div>

          <div class="space-y-3">
            <label class="block text-sm text-[#5A5A5A] dark:text-[#B7C0BA]">${t('口令', 'Passphrase')}</label>
            <input id="admin-passphrase" type="password" autocomplete="off" placeholder="${t('请输入口令', 'Enter passphrase')}" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] dark:bg-[#0B0F0C] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B] transition-all" />
            <p class="text-[11px] text-[#8C867D] dark:text-[#7C857F] leading-relaxed">
              ${t('提示：这是“隐藏”而非真正安全的权限系统。后续接入后端后应使用服务端权限控制。', 'Note: this is obscurity, not real security. Use server-side authorization once you have a backend.')}
            </p>
          </div>

          <div class="mt-6 flex items-center justify-end gap-3">
            <button data-action="admin-unlock-close" class="px-4 py-2 rounded-full text-sm font-medium bg-[#F5F0E8] dark:bg-[#17211B] text-[#5A5A5A] dark:text-[#B7C0BA] hover:bg-[#E8E2D9] dark:hover:bg-[#1E2A23] transition-colors">
              ${t('取消', 'Cancel')}
            </button>
            <button data-action="admin-unlock-submit" class="px-5 py-2 rounded-full text-sm font-medium bg-[#2A2A2A] text-white hover:bg-black transition-colors shadow-sm">
              ${t('解锁', 'Unlock')}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function legalModal() {
  if (!state.legal.open) return '';

  const isPrivacy = state.legal.doc === 'privacy';
  const isTerms = state.legal.doc === 'terms';
  const title = isPrivacy
    ? t('隐私政策', 'Privacy policy')
    : (isTerms ? t('用户协议', 'Terms of service') : t('绿漪共享菜园认领协议', 'Shared Garden Claim Agreement'));

  const privacyHtml = `
    <div class="space-y-5 text-sm leading-relaxed text-[#2A2A2A] dark:text-[#F3F4F6]">
      <div class="text-xs text-[#8C867D] dark:text-[#7C857F]">
        <div>${t('运营方：绿漪AURA', 'Operator: Green Ripple AURA')}</div>
        <div>${t('联系邮箱：AURA@outlook.com', 'Email: AURA@outlook.com')}</div>
        <div>${t('生效日期：以应用内展示为准', 'Effective date: as shown in-app')}</div>
      </div>

      <section class="space-y-2">
        <h3 class="font-medium">${t('1. 我们收集的信息与用途', '1. What we collect and why')}</h3>
        <ul class="list-disc pl-5 space-y-1 text-[#5A5A5A] dark:text-[#B7C0BA]">
          <li>${t('联系方式与基本资料：邮箱/手机号、昵称等，用于预约沟通与通知。', 'Contact details: email/phone, name, used for booking communication and notices.')}</li>
          <li>${t('你提交的内容：你输入/上传/生成的文本、图片、音视频、文件、反馈与客服记录，用于提供对应功能与改进服务。', 'Content you provide: text, images, audio/video, files, feedback, and support messages, used to deliver features and improve services.')}</li>
          <li>${t('交易信息（如付费）：订单、支付状态、退款状态，用于交易完成、对账与售后。', 'Payment/transaction info (if paid): orders and payment/refund status, used for billing, reconciliation, and support.')}</li>
          <li>${t('设备与日志信息：设备信息、IP、网络类型、应用版本、崩溃日志与操作日志，用于安全、排障与统计优化。', 'Device & log data: device details, IP, network, app version, crash and usage logs, used for security, debugging, and analytics.')}</li>
        </ul>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('2. 权限说明（相机）', '2. Permissions (Camera)')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('在你授权后，我们可能调用相机用于拍摄/上传照片或视频等功能。你可随时在系统设置中关闭授权；关闭后不影响基础功能，但相关功能可能不可用。', 'With your permission, we may access the camera for taking/uploading photos or videos. You can disable it in system settings at any time; core features remain, but related features may not work.')}
        </p>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('3. 存储与保存期限（Supabase）', '3. Storage & retention (Supabase)')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('我们使用 Supabase 及其底层云基础设施存储与处理数据。我们将在实现服务目的所必需的期间内保存信息；在你注销账号或我们停止运营/相关服务器关闭后，我们将根据法律法规要求与技术可行性删除或匿名化处理（法律要求或争议处理所必需的除外）。', 'We use Supabase and its underlying cloud infrastructure to store and process data. We retain data only as necessary for service purposes; after account deletion or service shutdown/server decommissioning, we will delete or anonymize where feasible and required by law (except where retention is legally required or needed for dispute resolution).')}
        </p>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('4. 共享与第三方SDK', '4. Sharing & third-party SDKs')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('我们不会出售个人信息。仅在提供服务所必需（如云服务、支付、消息通知、统计/崩溃分析等）或法律要求时共享必要信息，并会在接入第三方SDK前后更新并公示SDK清单（名称、用途、收集信息类型、隐私链接）。', 'We do not sell personal data. We share only what is necessary to provide the service (e.g., cloud services, payments, notifications, analytics/crash reporting) or as required by law, and we will publish/update a third‑party SDK list (name, purpose, data types, privacy link) when integrated.')}</p>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('5. 跨境传输', '5. Cross-border transfers')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('由于 Supabase 等基础设施可能位于境外或由境外实体提供支持，你的信息可能发生跨境存储/访问/传输。我们将尽力按适用法律采取必要保护措施，并在法律要求时取得你的单独同意。', 'Because Supabase and related infrastructure may be located outside your country/region or supported by overseas entities, your data may be stored/accessed/transferred cross‑border. We will take required safeguards under applicable law and obtain separate consent where required.')}</p>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('6. 你的权利与联系我们', '6. Your rights & contact')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('你可通过 AURA@outlook.com 申请访问、更正、删除、注销账号、撤回同意等。我们会在合理期限内处理。', 'You can email AURA@outlook.com to request access, correction, deletion, account deletion, or consent withdrawal. We will respond within a reasonable time.')}
        </p>
      </section>
    </div>
  `;

  const termsHtml = `
    <div class="space-y-5 text-sm leading-relaxed text-[#2A2A2A] dark:text-[#F3F4F6]">
      <div class="text-xs text-[#8C867D] dark:text-[#7C857F]">
        <div>${t('运营方：绿漪AURA', 'Operator: Green Ripple AURA')}</div>
        <div>${t('联系邮箱：AURA@outlook.com', 'Email: AURA@outlook.com')}</div>
        <div>${t('生效日期：以应用内展示为准', 'Effective date: as shown in-app')}</div>
      </div>

      <section class="space-y-2">
        <h3 class="font-medium">${t('1. 账号与使用规范', '1. Accounts & acceptable use')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('你应合法合规使用 AURA，不得发布违法违规或侵权内容，不得干扰、攻击、逆向工程、爬取或滥用服务。账号仅限你本人/本组织使用。', 'You must use AURA lawfully. Do not post illegal/infringing content, interfere with the service, attack, reverse engineer, scrape, or abuse it. Accounts are for your own use (or your organization) only.')}
        </p>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('2. 内容与知识产权', '2. Content & IP')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('AURA 的软件与相关内容的知识产权归我们或权利人所有。你上传/提交的内容由你或原权利人享有权利；你授予我们为提供与运营服务之目的进行必要处理（存储、展示、格式转换等）的非独占许可。', 'AURA software and related IP belong to us or rights holders. You retain rights to content you provide (or the original rights holder does). You grant us a non-exclusive license to process it as needed to provide and operate the service (storage, display, format conversion, etc.).')}
        </p>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('3. 付费与退款规则（通用）', '3. Payments & refunds (general)')}</h3>
        <ul class="list-disc pl-5 space-y-1 text-[#5A5A5A] dark:text-[#B7C0BA]">
          <li>${t('付费项目、价格、权益与期限以购买页面为准。', 'Paid items, pricing, benefits, and terms are shown on the purchase page.')}</li>
          <li>${t('订阅类（如有）：你可随时取消自动续费，取消后在当前周期到期前仍可继续使用；一般情况下已开始的订阅周期不支持按比例退款，但重复扣费/系统异常/未获得相应权益等情形可申请核实处理。', 'Subscriptions (if any): you can cancel auto-renew anytime; access continues until the current period ends. Generally, started periods are non-refundable, but you may request review for duplicate charges, system errors, or missing entitlements.')}</li>
          <li>${t('一次性数字化服务/即时交付内容（如有）：除法律另有规定或我们另行承诺外，一般不支持无条件退款；如未交付或明显缺陷无法使用，可申请处理。', 'One-time digital goods/instant delivery (if any): generally non-refundable unless required by law or otherwise promised; if not delivered or unusable due to defects, you may request support.')}</li>
          <li>${t('退款申请：请邮件联系 AURA@outlook.com，提供账号信息、订单号、支付凭证截图（如有）与原因，我们会在合理期限内处理。', 'Refund requests: email AURA@outlook.com with account info, order number, proof of payment (if any), and reason; we will respond within a reasonable time.')}</li>
        </ul>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('4. 未成年人', '4. Minors')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('未成年人应在监护人同意与指导下使用。我们可能基于合规需要对未成年人账号或部分功能进行限制。', 'Minors should use the service with guardian consent and guidance. We may restrict minor accounts or certain features for compliance.')}
        </p>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('5. 责任限制与争议解决', '5. Liability & disputes')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('在法律允许范围内，我们不对不可抗力、网络/系统故障、第三方原因导致的中断或损失承担全部责任。争议优先协商，协商不成提交运营方所在地有管辖权法院处理。', 'To the extent permitted by law, we are not liable for interruptions or losses caused by force majeure, network/system failures, or third parties. Disputes should be negotiated first; unresolved disputes go to the competent court where the operator is located.')}
        </p>
      </section>
    </div>
  `;

  const claimHtml = `
    <div class="space-y-5 text-sm leading-relaxed text-[#2A2A2A] dark:text-[#F3F4F6]">
      <div class="text-xs text-[#8C867D] dark:text-[#7C857F]">
        <div>${t('协议名称：绿漪共享菜园认领协议（演示版）', 'Title: Green Ripple Shared Garden Claim Agreement (Demo)')}</div>
        <div>${t('运营方：绿漪AURA', 'Operator: Green Ripple AURA')}</div>
        <div>${t('联系邮箱：AURA@outlook.com', 'Email: AURA@outlook.com')}</div>
      </div>

      <section class="space-y-2">
        <h3 class="font-medium">${t('1. 认领与使用说明', '1. Claim & usage')}</h3>
        <ul class="list-disc pl-5 space-y-1 text-[#5A5A5A] dark:text-[#B7C0BA]">
          <li>${t('“认领”系指你提交对指定地块/时段的使用意向与预约信息；最终是否确认，以我们邮件/站内确认结果为准。', '"Claim" means submitting your intent and booking details for a plot/time; final confirmation is subject to our email/in-app confirmation.')}</li>
          <li>${t('你应按约定时间入场与使用；如需改期/取消，请尽早通过邮件联系。', 'You should arrive and use the plot as scheduled; for reschedule/cancellation, contact us as early as possible via email.')}</li>
        </ul>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('2. 有机与安全承诺（重要）', '2. Organic & safety commitments (Important)')}</h3>
        <ul class="list-disc pl-5 space-y-1 text-[#5A5A5A] dark:text-[#B7C0BA]">
          <li>${t('不得使用化学农药、化学除草剂与其他可能破坏土壤/水体的化学品。', 'No chemical pesticides, herbicides, or other chemicals that may harm soil or water.')}</li>
          <li>${t('遵守现场安全与工具使用规则；儿童/未成年人应在监护人全程看护下活动。', 'Follow on-site safety and tool-use rules; children/minors must be supervised by a guardian at all times.')}</li>
          <li>${t('不得破坏公共设施、他人作物或地块边界；尊重邻里与公共秩序。', 'Do not damage shared facilities, others’ crops, or plot boundaries; respect others and public order.')}</li>
        </ul>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('3. 费用与退款（如适用）', '3. Fees & refunds (if applicable)')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('如认领涉及付费，具体价格、权益与退款规则以购买页面/订单页展示为准；如发生重复扣费、系统异常或未获得对应权益，可邮件申请核实处理。', 'If fees apply, pricing, benefits, and refund rules are shown on the purchase/order page. For duplicate charges, system errors, or missing entitlements, you may request review via email.')}
        </p>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('4. 责任与风险提示', '4. Risk & liability')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('农事活动存在一定风险（如划伤、过敏、晒伤等）。在法律允许范围内，你应对自身健康状况与行为负责；若因你违反现场规则造成损失，你应承担相应责任。', 'Farming activities involve risks (cuts, allergies, sunburn, etc.). To the extent permitted by law, you are responsible for your health and actions; you are liable for losses caused by rule violations.')}
        </p>
      </section>

      <section class="space-y-2">
        <h3 class="font-medium">${t('5. 争议解决与联系我们', '5. Disputes & contact')}</h3>
        <p class="text-[#5A5A5A] dark:text-[#B7C0BA]">
          ${t('如发生争议，优先协商；协商不成，提交运营方所在地有管辖权法院处理。联系邮箱：AURA@outlook.com。', 'Disputes should be negotiated first; unresolved disputes go to the competent court where the operator is located. Email: AURA@outlook.com.')}
        </p>
      </section>
    </div>
  `;

  const body = isPrivacy ? privacyHtml : (isTerms ? termsHtml : claimHtml);

  return `
    <div class="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div data-action="legal-close" class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div class="relative w-full max-w-3xl bg-white dark:bg-[#0F1511] rounded-3xl border border-[#E8E2D9] dark:border-[#22302A]/60 shadow-2xl overflow-hidden">
        <div class="p-6 sm:p-7 border-b border-[#E8E2D9] dark:border-[#22302A]/60 flex items-start justify-between gap-4">
          <div>
            <h3 class="text-xl font-serif text-[#2A2A2A] dark:text-[#F3F4F6]">${title}</h3>
            <p class="text-xs text-[#8C867D] dark:text-[#7C857F] mt-1">${t('阅读即表示你理解并同意相关条款（如适用）。', 'By reading you acknowledge the applicable terms (if any).')}</p>
          </div>
          <button data-action="legal-close" class="w-9 h-9 rounded-full bg-[#F5F0E8] dark:bg-[#17211B] text-[#5A5A5A] dark:text-[#B7C0BA] hover:bg-[#E8E2D9] dark:hover:bg-[#1E2A23] transition-colors">✕</button>
        </div>

        <div class="p-6 sm:p-7 max-h-[70vh] overflow-auto">
          ${body}
        </div>

        <div class="p-5 sm:p-6 border-t border-[#E8E2D9] dark:border-[#22302A]/60 bg-[#FAF9F6] dark:bg-[#0B0F0C] flex items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <button data-action="open-legal" data-legal="privacy" class="px-3 py-2 rounded-full text-xs font-medium border transition-colors ${state.legal.doc === 'privacy' ? 'bg-[#2A2A2A] text-white border-[#2A2A2A]' : 'bg-white dark:bg-[#0F1511] text-[#5A5A5A] dark:text-[#B7C0BA] border-[#E8E2D9] dark:border-[#22302A]/60 hover:border-[#87A96B]'}">${t('隐私政策', 'Privacy')}</button>
            <button data-action="open-legal" data-legal="terms" class="px-3 py-2 rounded-full text-xs font-medium border transition-colors ${state.legal.doc === 'terms' ? 'bg-[#2A2A2A] text-white border-[#2A2A2A]' : 'bg-white dark:bg-[#0F1511] text-[#5A5A5A] dark:text-[#B7C0BA] border-[#E8E2D9] dark:border-[#22302A]/60 hover:border-[#87A96B]'}">${t('用户协议', 'Terms')}</button>
            <button data-action="open-legal" data-legal="claim" class="px-3 py-2 rounded-full text-xs font-medium border transition-colors ${state.legal.doc === 'claim' ? 'bg-[#2A2A2A] text-white border-[#2A2A2A]' : 'bg-white dark:bg-[#0F1511] text-[#5A5A5A] dark:text-[#B7C0BA] border-[#E8E2D9] dark:border-[#22302A]/60 hover:border-[#87A96B]'}">${t('认领协议', 'Claim')}</button>
          </div>
          <button data-action="legal-close" class="px-4 py-2 rounded-full text-sm font-medium bg-[#87A96B] text-white hover:bg-[#76965B] transition-colors">${t('关闭', 'Close')}</button>
        </div>
      </div>
    </div>
  `;
}

function layout(contentHtml) {
  const route = parseRoute();
  const path = `#/${route.name === 'home' ? '' : route.name}`;

  return `
    <div class="min-h-screen bg-[#FAF9F6] text-[#2A2A2A] dark:bg-[#0B0F0C] dark:text-[#F3F4F6] font-sans selection:bg-[#B0D3A1] selection:text-[#2A2A2A] flex flex-col">
      <nav class="sticky top-0 z-50 bg-[#FAF9F6]/90 dark:bg-[#0B0F0C]/90 backdrop-blur-xl border-b border-[#E8E2D9]/50 dark:border-[#22302A]/60 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-20">
            <a href="#/" class="flex items-center gap-2">
              <span class="w-8 h-8 rounded-full bg-[#87A96B]/15 inline-flex items-center justify-center text-[#87A96B] font-bold">芽</span>
              <span class="font-semibold text-lg tracking-wide text-[#2A2A2A] dark:text-[#F3F4F6]">
                绿漪 <span class="text-[#87A96B] font-medium text-sm ml-1">Aura</span>
              </span>
            </a>

            <div class="hidden md:flex items-center space-x-8">
              ${navLink('/', '首页', 'Home', route.name === 'home')}
              ${navLink('/map', '选地认领', 'Plots', route.name === 'map' || route.name === 'plot' || route.name === 'booking')}
              <div class="h-4 w-[1px] bg-[#E8E2D9]"></div>
              <div class="flex items-center gap-3">
                <button data-action="toggle-lang" class="flex items-center justify-center w-8 h-8 rounded-full bg-[#F5F0E8] dark:bg-[#0F1511] text-[#5A5A5A] dark:text-[#B7C0BA] hover:bg-[#E8E2D9] dark:hover:bg-[#17211B] transition-colors text-xs font-semibold tracking-wider" title="${state.lang === 'zh' ? '切换为英文' : 'Switch to Chinese'}">
                  ${state.lang === 'zh' ? 'EN' : '中'}
                </button>
                <a href="#/settings" class="flex items-center justify-center w-8 h-8 rounded-full bg-[#F5F0E8] dark:bg-[#0F1511] text-[#5A5A5A] dark:text-[#B7C0BA] hover:bg-[#E8E2D9] dark:hover:bg-[#17211B] transition-colors" title="${state.lang === 'zh' ? '设置' : 'Settings'}">
                  <span class="text-sm">⚙</span>
                </a>
              </div>
            </div>

            <div class="md:hidden flex items-center gap-3">
              <button data-action="toggle-lang" class="flex items-center justify-center w-8 h-8 rounded-full bg-[#F5F0E8] dark:bg-[#0F1511] text-[#5A5A5A] dark:text-[#B7C0BA] hover:bg-[#E8E2D9] dark:hover:bg-[#17211B] transition-colors text-xs font-semibold tracking-wider">
                ${state.lang === 'zh' ? 'EN' : '中'}
              </button>
              <button data-action="toggle-mobile-menu" class="text-[#2A2A2A] dark:text-[#F3F4F6] p-2 hover:bg-[#F5F0E8] dark:hover:bg-[#17211B] rounded-full transition-colors" aria-label="${state.mobileMenuOpen ? '关闭菜单' : '打开菜单'}">
                ${state.mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>

        ${state.mobileMenuOpen ? `
          <div class="md:hidden absolute top-full left-0 w-full bg-[#FAF9F6] dark:bg-[#0B0F0C] border-b border-[#E8E2D9]/50 dark:border-[#22302A]/60 shadow-lg animate-in">
            <div class="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              <a href="#/" data-action="close-mobile-menu" class="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${route.name === 'home' ? 'bg-[#87A96B]/10 text-[#87A96B]' : 'text-[#5A5A5A] hover:bg-[#F5F0E8]'}">
                ${state.lang === 'zh' ? '首页' : 'Home'}
              </a>
              <a href="#/map" data-action="close-mobile-menu" class="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${route.name === 'map' || route.name === 'plot' || route.name === 'booking' ? 'bg-[#87A96B]/10 text-[#87A96B]' : 'text-[#5A5A5A] hover:bg-[#F5F0E8]'}">
                ${state.lang === 'zh' ? '选地认领' : 'Plots'}
              </a>
              <a href="#/settings" data-action="close-mobile-menu" class="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${route.name === 'settings' ? 'bg-[#87A96B]/10 text-[#87A96B]' : 'text-[#5A5A5A] hover:bg-[#F5F0E8]'}">
                ${state.lang === 'zh' ? '设置' : 'Settings'}
              </a>
            </div>
          </div>
        ` : ''}
      </nav>

      <main class="flex-1 flex flex-col relative">
        ${contentHtml}
      </main>

      <footer class="bg-white dark:bg-[#0F1511] text-[#5A5A5A] dark:text-[#B7C0BA] py-12 shrink-0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-[#87A96B]/15 inline-flex items-center justify-center text-[#87A96B] font-bold text-xs">芽</span>
            <span class="font-medium tracking-wide text-[#2A2A2A] dark:text-[#F3F4F6]">绿漪 Aura</span>
          </div>
          <div class="flex flex-col md:flex-row items-center gap-3 md:gap-6">
            <div class="flex items-center gap-4 text-sm">
              <button data-action="open-legal" data-legal="privacy" class="hover:text-[#87A96B] transition-colors">${t('隐私政策', 'Privacy policy')}</button>
              <button data-action="open-legal" data-legal="terms" class="hover:text-[#87A96B] transition-colors">${t('用户协议', 'Terms')}</button>
              <button data-action="open-legal" data-legal="claim" class="hover:text-[#87A96B] transition-colors">${t('认领协议', 'Claim agreement')}</button>
            </div>
            <p class="text-sm">© 2026 Aura. ${t('保留所有权利。', 'All rights reserved.')}</p>
          </div>
        </div>
      </footer>

      ${visitModal()}
      ${bookingDetailModal()}
      ${legalModal()}
      ${adminUnlockModal()}
    </div>
  `;
}

function pageHome() {
  return `
    <div class="flex-1 w-full text-[#2A2A2A]">
      <section class="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1642676677233-9bc8e693dc28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="Family farming in a sunny organic garden" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/80 via-[#2A2A2A]/40 to-transparent"></div>
        </div>
        <div class="relative z-10 max-w-4xl mx-auto px-4 text-center mt-32">
          <h1 class="text-5xl md:text-6xl font-serif text-[#FAF9F6] mb-6 tracking-tight">
            ${t('在CWA，拥有一块田', 'Own a garden plot—right in the CWA')}
          </h1>
          <p class="text-xl md:text-2xl text-[#F5F0E8] mb-12 font-light">
            ${t('远离都市喧嚣，认领你的私家小菜园，感受播种到收获的自然喜悦。', 'Escape the noise. Claim your personal plot and enjoy the journey from seed to harvest.')}
          </p>
          <a href="#/map" class="inline-flex items-center gap-2 bg-[#E8A86C] text-[#2A2A2A] px-10 py-4 rounded-full text-lg font-medium hover:bg-[#D99A60] hover:scale-105 transition-all shadow-lg">
            ${t('立即选地', 'Choose a plot')} <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-serif text-[#2A2A2A] mb-4">
            ${t('简单三步，成为农场主', 'Three steps to become a grower')}
          </h2>
          <p class="text-[#5A5A5A] max-w-2xl mx-auto">
            ${t('我们提供完善的配套服务，耕种能让你轻松享受田园生活。', 'We provide end-to-end support—planting can enjoy the garden life with ease.')}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div class="bg-white rounded-3xl p-8 shadow-sm border border-[#E8E2D9] hover:shadow-md transition-shadow text-center group">
            <div class="w-16 h-16 mx-auto bg-[#F5F0E8] text-[#87A96B] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#87A96B] group-hover:text-white transition-colors">
              <span class="text-2xl">🛒</span>
            </div>
            <h3 class="text-xl font-medium mb-3">${t('线上下单', 'Order online')}</h3>
            <p class="text-[#5A5A5A] text-sm leading-relaxed">
              ${t('在地图上挑选心仪地块,一键完成认领', 'Pick your favorite plot on the map and claim it in one click.')}
            </p>
          </div>

          <div class="bg-white rounded-3xl p-8 shadow-sm border border-[#E8E2D9] hover:shadow-md transition-shadow text-center group">
            <div class="w-16 h-16 mx-auto bg-[#F5F0E8] text-[#B35C44] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#B35C44] group-hover:text-white transition-colors">
              <span class="text-2xl">✉️</span>
            </div>
            <h3 class="text-xl font-medium mb-3">${t('邮件通知', 'Email confirmation')}</h3>
            <p class="text-[#5A5A5A] text-sm leading-relaxed">
              ${t('认领成功后，我们会在第一时间发送确认邮件，包含您的专属地块凭证、农场导航及新手种植指南等', 'After claiming, we’ll send a confirmation email with your plot pass, directions, and other materials that can help you plant.')}
            </p>
          </div>

          <div class="bg-white rounded-3xl p-8 shadow-sm border border-[#E8E2D9] hover:shadow-md transition-shadow text-center group">
            <div class="w-16 h-16 mx-auto bg-[#F5F0E8] text-[#E8A86C] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#E8A86C] group-hover:text-white transition-colors">
              <span class="text-2xl">🌱</span>
            </div>
            <h3 class="text-xl font-medium mb-3">${t('前往种地', 'Start growing')}</h3>
            <p class="text-[#5A5A5A] text-sm leading-relaxed">
              ${t('凭邮件指引前往绿漪农场，领取农具与种子，挽起袖子，即可开启属于你的田园种植之旅', 'Follow the email guide, pick up tools and seeds, and begin your growing journey.')}
            </p>
          </div>
        </div>
      </section>
    </div>
  `;
}

function plotStyles(id, customBaseColor) {
  const plot = PLOTS.find((p) => p.id === id);
  if (!plot) return '';
  let stateStyles = '';
  if (plot.status === 'available') stateStyles = `${customBaseColor || 'bg-[#87A96B]'} hover:brightness-110 cursor-pointer text-white shadow-sm`;
  if (plot.status === 'rented') stateStyles = `bg-[#B8B2A9] opacity-70 cursor-not-allowed text-[#5A5A5A]`;
  if (plot.status === 'pending') stateStyles = `bg-[#E8A86C]/90 cursor-pointer text-white shadow-sm`;
  if (plot.status === 'unavailable') stateStyles = `bg-[#E8E2D9] text-[#BDB6AC] cursor-not-allowed border border-dashed border-[#D1CCC5] shadow-inner`;
  const selectedStyles = state.selectedPlotId === id && plot.status !== 'unavailable'
    ? 'ring-4 ring-white shadow-xl z-10 scale-[1.03] font-bold text-white border-2 border-[#87A96B]'
    : 'border border-white/20';
  return `transition-all duration-300 relative flex items-center justify-center text-center font-medium overflow-hidden ${stateStyles} ${selectedStyles}`;
}

function pageMap() {
  const selectedPlot = state.selectedPlotId ? PLOTS.find((p) => p.id === state.selectedPlotId) : null;
  return `
    <div class="absolute inset-0 flex flex-col bg-[#FAF9F6] dark:bg-[#0B0F0C] overflow-hidden">
      <div class="w-full bg-white/90 dark:bg-[#0F1511]/90 backdrop-blur-md px-6 py-4 md:px-10 md:py-5 shadow-sm border-b border-[#E8E2D9] dark:border-[#22302A]/60 z-30 shrink-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h3 class="text-[#2A2A2A] font-medium text-xl flex items-center gap-2">
          ${t('绿漪农场全景图', 'Aura Farm Overview')}
        </h3>
        <div class="flex flex-wrap gap-4 text-sm text-[#5A5A5A]">
          <div class="flex items-center gap-2"><div class="w-4 h-4 bg-[#87A96B] rounded shadow-sm border border-black/5"></div> ${t('可选', 'Available')}</div>
          <div class="flex items-center gap-2"><div class="w-4 h-4 bg-[#E8A86C] rounded shadow-sm border border-black/5"></div> ${t('待审核', 'Pending')}</div>
          <div class="flex items-center gap-2"><div class="w-4 h-4 bg-[#B8B2A9] rounded shadow-sm border border-black/5"></div> ${t('已认领', 'Claimed')}</div>
          <div class="flex items-center gap-2"><div class="w-4 h-4 bg-[#E8E2D9] border border-dashed border-[#D1CCC5] rounded"></div> ${t('保育中', 'Rehab')}</div>
        </div>
      </div>

      <div class="relative flex-1 flex overflow-hidden">
        ${selectedPlot && selectedPlot.status !== 'unavailable' ? `
          <div class="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-40 w-80 bg-white dark:bg-[#0F1511] rounded-3xl pt-4 pb-5 px-5 shadow-2xl border border-[#E8E2D9] dark:border-[#22302A]/60 animate-in">
            <button data-action="clear-selected-plot" class="ml-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 dark:bg-[#111] text-[#8C867D] hover:text-[#2A2A2A] hover:bg-white shadow-sm transition-colors">✕</button>
            <img src="${selectedPlot.image}" alt="${escapeHtml(plotLabel(selectedPlot))}" class="w-full h-32 object-cover rounded-2xl mb-4" />
            <div class="mb-4">
              <div class="flex justify-between items-start mb-1">
                <h3 class="font-medium text-lg text-[#2A2A2A] dark:text-[#F3F4F6]">${escapeHtml(plotLabel(selectedPlot))}</h3>
                <span class="text-[#87A96B] bg-[#87A96B]/10 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                  ${t('试营业免费', 'Free trial')}
                </span>
              </div>
              <div class="flex items-center gap-2 text-sm text-[#5A5A5A]">
                <span class="flex items-center gap-1">📍 ${selectedPlot.size}㎡</span>
                ${selectedPlot.status === 'rented' ? `<span class="text-white bg-[#B8B2A9] px-2 py-0.5 rounded text-xs">${t('已认领', 'Claimed')}</span>` : ''}
                ${selectedPlot.status === 'pending' ? `<span class="text-white bg-[#E8A86C] px-2 py-0.5 rounded text-xs">${t('待审核', 'Pending')}</span>` : ''}
              </div>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
              ${plotTags(selectedPlot).map((tag) => `<span class="text-xs px-2.5 py-1 rounded-md bg-[#F5F0E8] text-[#5A5A5A]">${escapeHtml(tag)}</span>`).join('')}
            </div>
            <p class="text-sm text-[#5A5A5A] mb-5">
              ${escapeHtml(plotDesc(selectedPlot) || t('现在预订，立享新手种植大礼包。', 'Book now and get a beginner grow kit.'))}
            </p>
            ${selectedPlot.status === 'available' ? `
              <a href="#/plot/${encodeURIComponent(selectedPlot.id)}" class="w-full bg-[#87A96B] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#76965B] transition-colors shadow-sm flex items-center justify-center gap-2">
                🌿 ${t('查看地块详情', 'View details')}
              </a>
            ` : `
              <button disabled class="w-full bg-[#F5F0E8] text-[#BDB6AC] py-3 rounded-xl text-sm font-medium cursor-not-allowed">${t('不可预订', 'Unavailable')}</button>
            `}
          </div>
        ` : ''}

        <div class="flex-1 overflow-auto flex p-6 md:p-10 lg:p-16 relative w-full h-full">
          <div class="m-auto shrink-0 w-full min-w-[800px] min-h-[600px] md:min-h-0 max-w-5xl aspect-[4/3] md:aspect-[16/9] bg-[#E8E2D9]/40 p-6 md:p-8 rounded-[2rem] flex flex-col gap-6 md:gap-8 shadow-inner relative border-2 border-[#D1CCC5]/30">
            <div class="flex-1 flex flex-col md:flex-row gap-6 md:gap-12 w-full min-h-0 justify-center items-center">
              <div class="w-full md:w-[450px] lg:w-[500px] flex gap-4 md:gap-6 h-full shrink-0">
                <div class="flex-1 rounded-2xl flex-col flex items-center justify-center ${plotStyles('L1')}">
                  <span class="text-base md:text-lg tracking-[0.5em] writing-vertical-lr text-[#BDB6AC]/80">
                    ${t('保育区 一', 'Rehab Zone 1')}
                  </span>
                </div>
                <div class="flex-1 rounded-2xl flex-col flex items-center justify-center ${plotStyles('L2')}">
                  <span class="text-base md:text-lg tracking-[0.5em] writing-vertical-lr text-[#BDB6AC]/80">
                    ${t('保育区 二', 'Rehab Zone 2')}
                  </span>
                </div>
                <div class="flex-1 rounded-2xl flex-col flex items-center justify-center ${plotStyles('L3')}">
                  <span class="text-base md:text-lg tracking-[0.5em] writing-vertical-lr text-[#BDB6AC]/80">
                    ${t('保育区 三', 'Rehab Zone 3')}
                  </span>
                </div>
              </div>
              <div class="hidden md:block flex-1"></div>
              <div class="w-full md:w-[260px] lg:w-[320px] shrink-0 grid grid-cols-2 grid-rows-2 gap-4 md:gap-8 h-full">
                <button data-action="select-plot" data-plot-id="R1" class="rounded-2xl md:rounded-[2rem] shadow-md flex items-center justify-center ${plotStyles('R1', 'bg-[#87A96B]')}">
                  <span class="text-lg md:text-xl font-bold tracking-[0.3em] drop-shadow-sm writing-vertical-lr">R1</span>
                </button>
                <button data-action="select-plot" data-plot-id="R2" class="rounded-2xl md:rounded-[2rem] shadow-md flex items-center justify-center ${plotStyles('R2', 'bg-[#87A96B]')}">
                  <span class="text-lg md:text-xl font-bold tracking-[0.3em] drop-shadow-sm writing-vertical-lr">R2</span>
                </button>
                <button data-action="select-plot" data-plot-id="R3" class="rounded-2xl md:rounded-[2rem] shadow-md flex items-center justify-center ${plotStyles('R3', 'bg-[#87A96B]')}">
                  <span class="text-lg md:text-xl font-bold tracking-[0.3em] drop-shadow-sm writing-vertical-lr">R3</span>
                </button>
                <button data-action="select-plot" data-plot-id="R4" class="rounded-2xl md:rounded-[2rem] shadow-md flex items-center justify-center ${plotStyles('R4', 'bg-[#87A96B]')}">
                  <span class="text-lg md:text-xl font-bold tracking-[0.3em] drop-shadow-sm writing-vertical-lr">R4</span>
                </button>
              </div>
            </div>

            <div class="w-full h-14 md:h-20 flex gap-4 md:gap-6 shrink-0">
              <div class="flex-1 bg-[#D1CCC5]/30 rounded-2xl flex items-center justify-center relative overflow-hidden border border-[#D1CCC5]/60 shadow-inner">
                <div class="w-full border-t-[3px] border-dashed border-[#BDB6AC]/30 absolute top-1/2 -translate-y-1/2"></div>
                <div class="z-10 bg-[#E8E2D9] px-6 py-1.5 rounded-full shadow-sm border border-[#D1CCC5]/60 text-[#8C867D] text-sm md:text-base font-medium tracking-[0.5em] pl-[calc(1.5rem+0.5em)]">
                  ${t('主连廊', 'Main corridor')}
                </div>
              </div>
              <div class="w-24 md:w-32 bg-[#C2A383] rounded-2xl border-[3px] md:border-4 border-[#8C6B4E] shadow-sm flex items-center justify-center">
                <div class="flex flex-col items-center gap-1 text-white font-medium drop-shadow-md">
                  <span>🚪</span>
                  <span class="text-[10px] md:text-xs tracking-widest ml-1">
                    ${t('大门', 'Gate')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function pagePlotDetail({ id }) {
  const upper = (id || 'A01').toUpperCase();
  return `
    <div class="flex-1 pb-12">
      <div class="w-full h-[45vh] min-h-[400px] bg-[#E8E2D9] relative flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
        <img src="https://images.unsplash.com/photo-1761329707861-767a160525ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="${t('地块实景 1', 'Plot view 1')}" class="w-full sm:w-2/3 h-full object-cover shrink-0 snap-center border-r-2 border-[#FAF9F6]" />
        <img src="https://images.unsplash.com/photo-1657383765722-1e2354dbba61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="${t('地块实景 2', 'Plot view 2')}" class="w-full sm:w-2/3 h-full object-cover shrink-0 snap-center border-r-2 border-[#FAF9F6]" />
        <img src="https://images.unsplash.com/photo-1727099079513-952d40de9d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="${t('地块实景 3', 'Plot view 3')}" class="w-full sm:w-2/3 h-full object-cover shrink-0 snap-center" />
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <div class="w-2 h-2 rounded-full bg-white opacity-100"></div>
          <div class="w-2 h-2 rounded-full bg-white opacity-50"></div>
          <div class="w-2 h-2 rounded-full bg-white opacity-50"></div>
        </div>
      </div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div class="bg-white dark:bg-[#0F1511] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9] dark:border-[#22302A]/60 mb-8">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <span class="bg-[#87A96B] text-white text-xs px-2 py-1 rounded-md font-medium">${t('A 区可选', 'Zone A · Available')}</span>
                <span class="bg-[#F5F0E8] text-[#5A5A5A] text-xs px-2 py-1 rounded-md font-medium">${t('20㎡', '20 m²')}</span>
              </div>
              <h1 class="text-3xl font-serif text-[#2A2A2A]">${t('绿漪', 'Aura')} ${escapeHtml(upper)} ${t('号地块', 'Plot')}</h1>
            </div>
            <div class="text-left sm:text-right">
              <div class="inline-block bg-[#87A96B]/10 text-[#87A96B] px-4 py-2 rounded-xl text-lg font-semibold mt-2 border border-[#87A96B]/20">${t('试营业免费', 'Free trial')}</div>
            </div>
          </div>
        </div>

        <div class="mb-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-serif text-[#2A2A2A]">${t('前任地主评价', 'Reviews from previous growers')}</h2>
            <div class="flex items-center gap-1 text-[#E8A86C]">
              <span>★★★★★</span>
              <span class="text-[#5A5A5A] text-sm ml-2">${t('4.8 (12条评价)', '4.8 (12 reviews)')}</span>
            </div>
          </div>
          <div class="space-y-4">
            ${[1, 2].map(() => `
              <div class="bg-white dark:bg-[#0F1511] rounded-2xl p-5 border border-[#E8E2D9] dark:border-[#22302A]/60">
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-10 h-10 bg-[#F5F0E8] rounded-full flex items-center justify-center text-[#87A96B]">👤</div>
                  <div>
                    <p class="text-sm font-medium text-[#2A2A2A]">${t('李女士', 'Ms. Li')}</p>
                    <p class="text-[10px] text-[#5A5A5A]">${t('认领周期：2025春季', 'Season: Spring 2025')}</p>
                  </div>
                </div>
                <p class="text-sm text-[#2A2A2A] leading-relaxed mb-3">
                  ${t(
                    '土质非常好，托管模式省心省力。每周都能收到管家发来的照片，上周去采摘了第一波小西红柿，孩子特别开心！',
                    'Great soil and the managed plan is truly hassle-free. We got weekly photos, and last week we picked our first cherry tomatoes—kids loved it!'
                  )}
                </p>
                <div class="flex gap-2">
                  <img src="https://images.unsplash.com/photo-1753172433718-d0c2a99443d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200" alt="${t('采收', 'Harvest')}" class="w-16 h-16 rounded-lg object-cover" />
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

      <div class="sticky bottom-0 left-0 right-0 bg-white border-t border-[#E8E2D9] p-4 sm:p-6 z-20">
        <div class="max-w-4xl mx-auto flex items-center justify-between">
          <div class="flex flex-col">
            <span class="text-sm text-[#5A5A5A]">${t('试营业特惠', 'Trial offer')}</span>
            <div class="flex items-end gap-2 mt-1">
              <span class="text-xl font-semibold text-[#87A96B]">${t('免费体验', 'Free trial')}</span>
              <span class="text-xs text-[#5A5A5A] mb-1">${t('免认领及套餐费', 'No claim or package fees')}</span>
            </div>
          </div>
          <button type="button" data-action="open-plot-book-modal" data-plot-id="${escapeHtml(id || 'A01')}" class="bg-[#B35C44] text-white px-8 py-3.5 rounded-full font-medium shadow-lg hover:bg-[#9E513A] hover:-translate-y-0.5 transition-all flex items-center gap-2">
            ${t('立即预约', 'Book now')} <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>

      ${state.ui.plotBookModalOpen && String(state.ui.plotBookModalPlotId || '').toUpperCase() === upper ? `
        <div class="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-4">
          <div data-action="close-plot-book-modal" class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div class="relative w-full max-w-md bg-white rounded-3xl border border-[#E8E2D9] shadow-2xl overflow-hidden">
            <div class="p-6 sm:p-7">
              <div class="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3 class="text-xl font-serif text-[#2A2A2A]">${t('选择预约方式', 'Choose how to book')}</h3>
                  <p class="text-sm text-[#5A5A5A] mt-1">${t('请先选择您偏好的提交渠道，再继续填写认领信息。', 'Pick a channel first, then continue to the claim form.')}</p>
                </div>
                <button type="button" data-action="close-plot-book-modal" class="w-9 h-9 rounded-full bg-[#F5F0E8] text-[#5A5A5A] hover:bg-[#E8E2D9]">✕</button>
              </div>
              <div class="space-y-3">
                <button type="button" data-action="plot-book-pick" data-pick="email" data-plot-id="${escapeHtml(id || 'A01')}" class="w-full py-3.5 rounded-2xl bg-[#2A2A2A] text-white font-medium hover:bg-black transition-colors">
                  ${t('电子邮件预约', 'Email booking')}
                </button>
                <button type="button" data-action="plot-book-pick" data-pick="survey" data-plot-id="${escapeHtml(id || 'A01')}" class="w-full py-3.5 rounded-2xl border-2 border-[#87A96B] text-[#87A96B] font-medium hover:bg-[#87A96B]/10 transition-colors">
                  ${t('在线表格（问卷星）', 'Online form (survey)')}
                </button>
              </div>
              <p class="text-[11px] text-[#8C867D] mt-4 leading-relaxed">
                ${t('在线表格将在新标签打开；您仍可在认领页复制邮件备份。', 'The survey opens in a new tab. You can still copy an email draft on the claim page.')}
              </p>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function pageBooking({ id }) {
  const upper = (id || 'A01').toUpperCase();
  const bf = state.bookingForm;
  const entry = state.ui.bookingEntryMode;

  const seedChips = (bf.seeds || []).map((code, idx) => `
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F0E8] text-sm text-[#2A2A2A] border border-[#E8E2D9]">
                ${escapeHtml(seedOptionLabel(code))}
                <button type="button" data-action="booking-seed-remove" data-seed-index="${idx}" class="text-[#8C867D] hover:text-[#B35C44] text-xs px-1" aria-label="${t('移除', 'Remove')}">✕</button>
              </span>`).join('');

  const seedSelectOptions = BOOKING_SEED_OPTIONS.map((o) => {
    const has = (bf.seeds || []).includes(o.code);
    const lab = state.lang === 'zh' ? o.zh : o.en;
    return `<option value="${o.code}" ${has ? 'disabled' : ''}>${escapeHtml(lab)}${has ? ` (${t('已添加', 'added')})` : ''}</option>`;
  }).join('');

  const hasDay = bf.dayFri || bf.daySat || bf.daySun;
  const seedsOk = !bf.wantSeeds || ((bf.seeds || []).length > 0);
  const canSubmit = !!(bf.agreed && (bf.name || '').trim() && bf.participants >= 1 && bf.toolPack && hasDay && bf.timeSlot && seedsOk);

  const entryBanner = entry === 'email'
    ? `<div class="mb-6 p-4 rounded-2xl bg-[#87A96B]/10 border border-[#87A96B]/25 text-sm text-[#2A2A2A]">${t('您已在「立即预约」选择：电子邮件。填写完成后可用下方按钮生成邮件。', 'You chose email on the plot page. Use the buttons below when ready.')}</div>`
    : entry === 'survey'
      ? `<div class="mb-6 p-4 rounded-2xl bg-[#E8A86C]/15 border border-[#E8A86C]/30 text-sm text-[#2A2A2A]">${t('您已在「立即预约」选择：在线表格（问卷星）。问卷可在新标签打开；此处仍可填写并复制邮件备份。', 'You chose the online survey. It can open in a new tab—you can still fill this form and copy a draft email.')}</div>`
      : '';

  return `
    <div class="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-serif text-[#2A2A2A] mb-6 flex items-center gap-3">
          <span class="w-8 h-8 inline-flex items-center justify-center rounded-full bg-[#87A96B]/15 text-[#87A96B]">🌿</span>
          ${t('确认认领', 'Confirm claim')}
        </h1>
        ${entryBanner}

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-6">
            <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9]">
              <h2 class="text-xl font-medium text-[#2A2A2A] mb-6 flex items-center gap-2">
                <span>👤</span> ${t('参与者信息', 'Participants')}
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-[#2A2A2A] mb-2">${t('姓名', 'Name')} <span class="text-[#B35C44]">*</span></label>
                  <input id="bf-name" type="text" value="${escapeHtml(bf.name || '')}" placeholder="${t('请输入姓名', 'Full name')}" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B]" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-[#2A2A2A] mb-2">${t('参与人数', 'Number of people')} <span class="text-[#B35C44]">*</span></label>
                  <input id="bf-participants" type="number" min="1" max="20" step="1" value="${Number(bf.participants) || 1}" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B]" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-[#2A2A2A] mb-2">${t('宝贝小名', "Kid's nickname")}</label>
                  <input id="bf-kidname" type="text" value="${escapeHtml(bf.kidName || '')}" placeholder="${t('选填', 'Optional')}" class="w-full px-4 py-3 rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] focus:outline-none focus:border-[#87A96B] focus:ring-1 focus:ring-[#87A96B]" />
                </div>
              </div>
            </div>

            <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9]">
              <h2 class="text-xl font-medium text-[#2A2A2A] mb-4 flex items-center gap-2">
                <span>🌱</span> ${t('认领种子吗？', 'Claim seeds?')}
              </h2>
              <div class="flex gap-2 mb-4">
                <button type="button" data-action="bf-want-seeds" data-val="false" class="flex-1 py-3 rounded-2xl text-sm font-medium border-2 transition-all ${!bf.wantSeeds ? 'border-[#2A2A2A] bg-[#2A2A2A] text-white' : 'border-[#E8E2D9] text-[#5A5A5A] hover:border-[#87A96B]/50'}">${t('否', 'No')}</button>
                <button type="button" data-action="bf-want-seeds" data-val="true" class="flex-1 py-3 rounded-2xl text-sm font-medium border-2 transition-all ${bf.wantSeeds ? 'border-[#87A96B] bg-[#87A96B] text-white' : 'border-[#E8E2D9] text-[#5A5A5A] hover:border-[#87A96B]/50'}">${t('是', 'Yes')}</button>
              </div>
              ${bf.wantSeeds ? `
              <div class="rounded-2xl border border-[#E8E2D9] bg-[#FAF9F6] p-4 space-y-3">
                <p class="text-xs text-[#5A5A5A]">${t('可从下列品种中添加多项，点击标签上的 ✕ 删除。', 'Add one or more varieties; tap ✕ on a chip to remove.')}</p>
                <div class="flex flex-wrap gap-2 min-h-[2rem]">${seedChips || `<span class="text-xs text-[#8C867D]">${t('尚未添加种子', 'No seeds added yet')}</span>`}</div>
                <div class="flex flex-col sm:flex-row gap-2">
                  <select id="bf-seed-pick" class="flex-1 appearance-none pl-4 pr-10 py-3 rounded-2xl border border-[#E8E2D9] bg-white focus:outline-none focus:border-[#87A96B] text-sm">
                    <option value="">${t('选择品种…', 'Choose a variety…')}</option>
                    ${seedSelectOptions}
                  </select>
                  <button type="button" data-action="booking-seed-add" class="shrink-0 px-5 py-3 rounded-2xl bg-[#2A2A2A] text-white text-sm font-medium hover:bg-black">${t('添加', 'Add')}</button>
                </div>
              </div>` : ''}
            </div>

            <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9]">
              <h2 class="text-xl font-medium text-[#2A2A2A] mb-4">${t('需要工具包吗？', 'Need a tool package?')} <span class="text-[#B35C44]">*</span></h2>
              <div class="flex gap-2">
                <button type="button" data-action="bf-tool" data-val="yes" class="flex-1 py-3 rounded-2xl text-sm font-medium border-2 transition-all ${bf.toolPack === 'yes' ? 'border-[#87A96B] bg-[#87A96B] text-white' : 'border-[#E8E2D9] text-[#5A5A5A]'}">${t('需要', 'Yes')}</button>
                <button type="button" data-action="bf-tool" data-val="no" class="flex-1 py-3 rounded-2xl text-sm font-medium border-2 transition-all ${bf.toolPack === 'no' ? 'border-[#2A2A2A] bg-[#2A2A2A] text-white' : 'border-[#E8E2D9] text-[#5A5A5A]'}">${t('不需要', 'No')}</button>
              </div>
            </div>

            <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9]">
              <h2 class="text-xl font-medium text-[#2A2A2A] mb-4">${t('种植日（可多选）', 'Planting days (multi)')} <span class="text-[#B35C44]">*</span></h2>
              <p class="text-xs text-[#5A5A5A] mb-3">${t('周五、周六、周日中至少选一天。', 'Pick at least one: Fri / Sat / Sun.')}</p>
              <div class="flex flex-wrap gap-2">
                <button type="button" data-action="bf-toggle-day" data-day="fri" class="flex-1 min-w-[88px] py-3 rounded-2xl text-sm font-medium border-2 transition-all ${bf.dayFri ? 'border-[#87A96B] bg-[#87A96B]/15 text-[#2A2A2A]' : 'border-[#E8E2D9] text-[#5A5A5A]'}">${t('周五', 'Fri')}</button>
                <button type="button" data-action="bf-toggle-day" data-day="sat" class="flex-1 min-w-[88px] py-3 rounded-2xl text-sm font-medium border-2 transition-all ${bf.daySat ? 'border-[#87A96B] bg-[#87A96B]/15 text-[#2A2A2A]' : 'border-[#E8E2D9] text-[#5A5A5A]'}">${t('周六', 'Sat')}</button>
                <button type="button" data-action="bf-toggle-day" data-day="sun" class="flex-1 min-w-[88px] py-3 rounded-2xl text-sm font-medium border-2 transition-all ${bf.daySun ? 'border-[#87A96B] bg-[#87A96B]/15 text-[#2A2A2A]' : 'border-[#E8E2D9] text-[#5A5A5A]'}">${t('周日', 'Sun')}</button>
              </div>
            </div>

            <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9]">
              <h2 class="text-xl font-medium text-[#2A2A2A] mb-4">${t('时间段', 'Time slot')} <span class="text-[#B35C44]">*</span></h2>
              <div class="flex flex-col sm:flex-row gap-2">
                <button type="button" data-action="bf-time" data-val="morning" class="flex-1 py-3 rounded-2xl text-sm font-medium border-2 transition-all ${bf.timeSlot === 'morning' ? 'border-[#87A96B] bg-[#87A96B] text-white' : 'border-[#E8E2D9] text-[#5A5A5A]'}">${t('上午', 'Morning')}</button>
                <button type="button" data-action="bf-time" data-val="afternoon" class="flex-1 py-3 rounded-2xl text-sm font-medium border-2 transition-all ${bf.timeSlot === 'afternoon' ? 'border-[#87A96B] bg-[#87A96B] text-white' : 'border-[#E8E2D9] text-[#5A5A5A]'}">${t('下午', 'Afternoon')}</button>
                <button type="button" data-action="bf-time" data-val="unsure" class="flex-1 py-3 rounded-2xl text-sm font-medium border-2 transition-all ${bf.timeSlot === 'unsure' ? 'border-[#E8A86C] bg-[#E8A86C] text-white' : 'border-[#E8E2D9] text-[#5A5A5A]'}">${t('不确定', 'Unsure')}</button>
              </div>
            </div>
          </div>

          <div class="lg:col-span-1">
            <div class="bg-white rounded-3xl p-6 shadow-sm border border-[#E8E2D9] sticky top-24">
              <h3 class="text-lg font-serif text-[#2A2A2A] mb-6">${t('预约摘要', 'Summary')}</h3>
              <div class="space-y-3 text-sm mb-6">
                <div class="flex justify-between gap-2 text-[#5A5A5A]">
                  <span>${t('地块', 'Plot')}</span>
                  <span class="font-medium text-[#2A2A2A] text-right">${t('绿漪', 'Aura')} ${escapeHtml(upper)}</span>
                </div>
                <div class="flex justify-between gap-2 text-[#5A5A5A]">
                  <span>${t('姓名', 'Name')}</span>
                  <span id="summary-bf-name" class="font-medium text-[#2A2A2A] text-right max-w-[55%] truncate">${escapeHtml((bf.name || '').trim() || '—')}</span>
                </div>
                <div class="flex justify-between gap-2 text-[#5A5A5A]">
                  <span>${t('人数', 'Guests')}</span>
                  <span id="summary-bf-participants" class="font-medium text-[#2A2A2A]">${Number(bf.participants) || 1}</span>
                </div>
                <div class="flex justify-between gap-2 text-[#5A5A5A]">
                  <span>${t('宝贝小名', 'Kid')}</span>
                  <span id="summary-bf-kid" class="font-medium text-[#2A2A2A] text-right max-w-[55%] truncate">${escapeHtml((bf.kidName || '').trim() || '—')}</span>
                </div>
                <div class="flex justify-between gap-2 text-[#5A5A5A]">
                  <span>${t('认领种子', 'Seeds')}</span>
                  <span id="summary-bf-seeds" class="font-medium text-[#2A2A2A] text-right text-xs leading-snug max-w-[60%]">${bf.wantSeeds ? ((bf.seeds || []).length ? (bf.seeds || []).map(seedOptionLabel).join('、') : t('是（待添加）', 'Yes (add)')) : t('否', 'No')}</span>
                </div>
                <div class="flex justify-between gap-2 text-[#5A5A5A]">
                  <span>${t('工具包', 'Tools')}</span>
                  <span id="summary-bf-tools" class="font-medium text-[#2A2A2A]">${bf.toolPack === 'yes' ? t('需要', 'Yes') : bf.toolPack === 'no' ? t('不需要', 'No') : '—'}</span>
                </div>
                <div class="flex justify-between gap-2 text-[#5A5A5A]">
                  <span>${t('种植日', 'Days')}</span>
                  <span id="summary-bf-days" class="font-medium text-[#2A2A2A] text-right text-xs leading-snug max-w-[60%]">${[bf.dayFri && t('周五', 'Fri'), bf.daySat && t('周六', 'Sat'), bf.daySun && t('周日', 'Sun')].filter(Boolean).join('、') || '—'}</span>
                </div>
                <div class="flex justify-between gap-2 text-[#5A5A5A]">
                  <span>${t('时间段', 'Time')}</span>
                  <span id="summary-bf-time" class="font-medium text-[#2A2A2A]">${bf.timeSlot === 'morning' ? t('上午', 'Morning') : bf.timeSlot === 'afternoon' ? t('下午', 'Afternoon') : bf.timeSlot === 'unsure' ? t('不确定', 'Unsure') : '—'}</span>
                </div>
                <div class="flex justify-between items-center text-[#5A5A5A] pt-2 border-t border-[#E8E2D9]">
                  <span>${t('试营业费用', 'Trial pricing')}</span>
                  <span class="font-medium text-[#87A96B] bg-[#87A96B]/10 px-2 py-0.5 rounded text-xs">${t('全免', 'Free')}</span>
                </div>
              </div>

              <div class="border-t border-[#E8E2D9] pt-4 mb-6">
                <div class="flex justify-between items-end">
                  <span class="text-[#2A2A2A] font-medium">${t('总计', 'Total')}</span>
                  <span class="text-2xl font-semibold text-[#87A96B]">${t('免费体验', 'Free trial')}</span>
                </div>
              </div>

              <label class="flex items-start gap-3 cursor-pointer mb-6 group">
                <input id="agree" type="checkbox" class="mt-1 w-4 h-4 rounded border-[#D1CCC5] text-[#87A96B] focus:ring-[#87A96B]" ${bf.agreed ? 'checked' : ''} />
                <span class="text-xs text-[#5A5A5A] leading-relaxed">
                  ${t('我已阅读并同意', 'I have read and agree to the')}
                  <button type="button" data-action="open-legal" data-legal="claim" class="text-[#87A96B] hover:underline underline-offset-2 mx-1">
                    ${t('《绿漪共享菜园认领协议》', 'Aura Shared Garden Agreement')}
                  </button>
                  ${t('，承诺不使用化学农药，共同维护有机土壤环境。', ', and commit to chemical-free farming to protect organic soil.')}
                </span>
              </label>

              <button id="confirm-booking" data-action="confirm-booking" ${canSubmit ? '' : 'disabled'} class="w-full py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all ${canSubmit ? 'bg-[#2A2A2A] text-white hover:bg-black shadow-md' : 'bg-[#E8E2D9] text-[#8C867D] cursor-not-allowed'}">
                ${t('确认预约', 'Confirm')} <span aria-hidden="true">›</span>
              </button>
              ${(() => {
                const bp = state.ui.bookingSubmitPanel;
                const show = bp && String(bp.plotUpper || '').toUpperCase() === upper;
                if (!show) return '';
                return `
              <div class="mt-5 p-4 sm:p-5 rounded-2xl border border-[#87A96B]/35 bg-[#87A96B]/8 space-y-4">
                <p class="text-sm font-medium text-[#2A2A2A] leading-snug">
                  ${t('预约信息已保存。您可以通过邮件、在线问卷提交，或复制下方全文到任意邮件/聊天工具。', 'Your request is saved. Send it via email, the online survey, or copy the full text below.')}
                </p>
                <div class="text-xs text-[#5A5A5A] space-y-1">
                  <div><span class="text-[#8C867D]">${t('收件邮箱', 'To')}</span> <span class="font-mono text-[#2A2A2A] select-all">${escapeHtml(CLAIM_INBOX_EMAIL)}</span></div>
                  <div><span class="text-[#8C867D]">${t('问卷链接', 'Survey')}</span> <a href="${escapeHtml(BOOKING_SURVEY_URL)}" target="_blank" rel="noopener noreferrer" class="text-[#87A96B] underline underline-offset-2 break-all">${escapeHtml(BOOKING_SURVEY_URL)}</a></div>
                </div>
                <div class="flex flex-col gap-2">
                  <button type="button" data-action="booking-open-mail" class="w-full py-3 rounded-full text-sm font-medium bg-[#2A2A2A] text-white hover:bg-black transition-colors">
                    ${t('打开邮件客户端', 'Open email app')}
                  </button>
                  <a href="${escapeHtml(BOOKING_SURVEY_URL)}" target="_blank" rel="noopener noreferrer" class="w-full py-3 rounded-full text-sm font-medium text-center border-2 border-[#87A96B] text-[#87A96B] hover:bg-[#87A96B]/10 transition-colors">
                    ${t('打开在线问卷', 'Open online survey')}
                  </a>
                  <button type="button" data-action="booking-copy-full" class="w-full py-3 rounded-full text-sm font-medium border border-[#E8E2D9] text-[#2A2A2A] hover:bg-[#FAF9F6] transition-colors">
                    ${t('复制全文（邮箱+主题+正文+问卷链接）', 'Copy all (email, subject, body, link)')}
                  </button>
                </div>
              </div>`;
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
function pageSettings() {
  return `
    <div class="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-baseline justify-between gap-4 mb-8">
          <h1 class="text-3xl font-serif text-[#2A2A2A] mb-0">${t('账户设置', 'Account settings')}</h1>
          <button data-action="admin-easter-egg" class="text-[11px] text-[#8C867D] hover:text-[#5A5A5A] transition-colors select-none">${t('版本 0.1.0', 'Version 0.1.0')}</button>
        </div>

        <div class="space-y-8">
          <section class="bg-white dark:bg-[#0F1511] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9] dark:border-[#22302A]/60">
            <h2 class="text-lg font-medium text-[#2A2A2A] mb-6 flex items-center gap-2">🔔 ${t('偏好与通知', 'Preferences')}</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between py-3 border-b border-[#E8E2D9] last:border-0">
                <div class="flex items-center gap-3">
                  <span class="w-5">🌐</span>
                  <div>
                    <p class="font-medium text-[#2A2A2A]">${t('语言 / Language', 'Language')}</p>
                    <p class="text-sm text-[#5A5A5A]">${t('切换应用的显示语言', 'Switch app display language')}</p>
                  </div>
                </div>
                <div class="flex items-center bg-[#FAF9F6] rounded-lg p-1 border border-[#E8E2D9]">
                  <button data-action="set-lang" data-lang="zh" class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${state.lang === 'zh' ? 'bg-white text-[#87A96B] shadow-sm' : 'text-[#5A5A5A] hover:text-[#2A2A2A]'}">中文</button>
                  <button data-action="set-lang" data-lang="en" class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${state.lang === 'en' ? 'bg-white text-[#87A96B] shadow-sm' : 'text-[#5A5A5A] hover:text-[#2A2A2A]'}">EN</button>
                </div>
              </div>

              <!-- Dark mode row removed -->
            </div>
          </section>

          <section class="bg-white dark:bg-[#0F1511] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E2D9] dark:border-[#22302A]/60">
            <h2 class="text-lg font-medium text-[#2A2A2A] mb-4 flex items-center gap-2">🛡️ ${t('账户与安全', 'Security')}</h2>
            <div class="space-y-2">
              <button data-action="open-legal" data-legal="privacy" class="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#FAF9F6] transition-colors">
                <span class="text-[#2A2A2A]">${t('隐私政策', 'Privacy policy')}</span>
                <span class="w-4 h-4 text-[#8C867D]">›</span>
              </button>
              <button data-action="open-legal" data-legal="terms" class="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#FAF9F6] transition-colors">
                <span class="text-[#2A2A2A]">${t('用户协议', 'Terms')}</span>
                <span class="w-4 h-4 text-[#8C867D]">›</span>
              </button>
              <button data-action="open-legal" data-legal="claim" class="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#FAF9F6] transition-colors">
                <span class="text-[#2A2A2A]">${t('认领协议', 'Claim agreement')}</span>
                <span class="w-4 h-4 text-[#8C867D]">›</span>
              </button>

              ${state.admin.unlocked ? `
                <button data-action="admin-lock" class="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#FAF9F6] transition-colors text-[#B35C44]">
                  <span class="flex items-center gap-2">🔒 ${t('锁定隐藏管理区', 'Lock hidden admin')}</span>
                </button>
              ` : ''}
            </div>
          </section>
        </div>

        <div class="mt-8 flex justify-end">
          <button data-action="save-settings" class="px-8 py-3 bg-[#2A2A2A] text-white rounded-full font-medium shadow-md hover:shadow-lg hover:bg-black transition-all">${t('保存设置', 'Save')}</button>
        </div>
      </div>
    </div>
  `;
}

function pageNotFound() {
  return `
    <div class="flex-1 flex items-center justify-center p-10">
      <div class="max-w-lg w-full bg-white rounded-3xl p-8 shadow-sm border border-[#E8E2D9] text-center">
        <h1 class="text-2xl font-serif mb-2">${t('页面不存在', 'Page not found')}</h1>
        <p class="text-sm text-[#5A5A5A] mb-6">${t('请从导航返回首页。', 'Use the navigation to return home.')}</p>
        <a href="#/" class="inline-flex items-center gap-2 bg-[#87A96B] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#76965B] transition-colors">${t('返回首页', 'Back to home')}</a>
      </div>
    </div>
  `;
}

function pageAdmin() {
  if (!state.admin.unlocked) {
    return `
      <div class="flex-1 flex items-center justify-center p-10">
        <div class="max-w-lg w-full bg-white dark:bg-[#0F1511] rounded-3xl p-8 shadow-sm border border-[#E8E2D9] dark:border-[#22302A]/60 text-center">
          <h1 class="text-2xl font-serif mb-2">${t('需要解锁', 'Locked')}</h1>
          <p class="text-sm text-[#5A5A5A] dark:text-[#B7C0BA] mb-6">
            ${t('此页面为隐藏管理区域。请输入口令以继续。', 'This is a hidden admin area. Enter the passphrase to continue.')}
          </p>
          <button data-action="open-admin-unlock" class="inline-flex items-center gap-2 bg-[#2A2A2A] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-black transition-colors shadow-sm">
            ${t('输入口令', 'Enter passphrase')} <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    `;
  }

  const since = state.admin.unlockedAt ? new Date(state.admin.unlockedAt).toLocaleString() : '—';
  return `
    <div class="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 class="text-3xl font-serif text-[#2A2A2A] dark:text-[#F3F4F6]">${t('管理控制台（隐藏）', 'Admin console (hidden)')}</h1>
            <p class="text-sm text-[#5A5A5A] dark:text-[#B7C0BA] mt-2">
              ${t('已解锁时间：', 'Unlocked at: ')}${escapeHtml(since)}
            </p>
          </div>
          <button data-action="admin-lock" class="px-4 py-2 rounded-full text-sm font-medium bg-[#F5F0E8] dark:bg-[#17211B] text-[#B35C44] hover:bg-[#E8E2D9] dark:hover:bg-[#1E2A23] transition-colors border border-[#E8E2D9] dark:border-[#22302A]/60">
            ${t('锁定', 'Lock')}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white dark:bg-[#0F1511] rounded-3xl p-6 shadow-sm border border-[#E8E2D9] dark:border-[#22302A]/60">
            <div class="text-xs text-[#8C867D] dark:text-[#7C857F] mb-2">${t('快速操作', 'Quick actions')}</div>
            <div class="space-y-2">
              <button data-action="open-legal" data-legal="privacy" class="w-full text-left px-4 py-3 rounded-2xl hover:bg-[#FAF9F6] dark:hover:bg-[#0B0F0C] transition-colors">
                ${t('查看隐私政策', 'View privacy policy')}
              </button>
              <button data-action="open-legal" data-legal="terms" class="w-full text-left px-4 py-3 rounded-2xl hover:bg-[#FAF9F6] dark:hover:bg-[#0B0F0C] transition-colors">
                ${t('查看用户协议', 'View terms')}
              </button>
              <button data-action="open-legal" data-legal="claim" class="w-full text-left px-4 py-3 rounded-2xl hover:bg-[#FAF9F6] dark:hover:bg-[#0B0F0C] transition-colors">
                ${t('查看认领协议', 'View claim agreement')}
              </button>
            </div>
          </div>

          <div class="md:col-span-2 bg-white dark:bg-[#0F1511] rounded-3xl p-6 shadow-sm border border-[#E8E2D9] dark:border-[#22302A]/60">
            <div class="text-xs text-[#8C867D] dark:text-[#7C857F] mb-2">${t('说明', 'Notes')}</div>
            <p class="text-sm text-[#5A5A5A] dark:text-[#B7C0BA] leading-relaxed">
              ${t('这是纯前端演示版的隐藏管理页。若你后续接入 Supabase/后端，请把权限控制放在服务端（RLS/角色），不要依赖隐藏入口。', 'This is a demo-only hidden admin page. If you later add Supabase/backend, enforce permissions server-side (RLS/roles) instead of relying on obscurity.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function render() {
  const app = document.getElementById('app');
  const route = parseRoute();

  if (route.name !== 'plot') {
    state.ui.plotBookModalOpen = false;
    state.ui.plotBookModalPlotId = null;
  }
  if (route.name !== 'booking') {
    state.ui.bookingSubmitPanel = null;
    state.ui.bookingEntryMode = null;
  }

  let pageHtml = '';
  if (route.name === 'home') pageHtml = pageHome();
  else if (route.name === 'map') pageHtml = pageMap();
  else if (route.name === 'plot') pageHtml = pagePlotDetail(route.params);
  else if (route.name === 'booking') {
    ensureBookingFormForPlot(route.params?.id);
    pageHtml = pageBooking(route.params);
  }
  else if (route.name === 'settings') pageHtml = pageSettings();
  else if (route.name === 'admin') pageHtml = pageAdmin();
  else pageHtml = pageNotFound();

  app.innerHTML = layout(pageHtml);
  if (route.name === 'booking') {
    requestAnimationFrame(() => updateConfirmBookingButton());
  }
}

function onClick(e) {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.getAttribute('data-action');

  if (action === 'open-legal') {
    const doc = el.getAttribute('data-legal');
    state.legal.doc = doc === 'terms' ? 'terms' : (doc === 'claim' ? 'claim' : 'privacy');
    state.legal.open = true;
    render();
    return;
  }
  if (action === 'legal-close') {
    state.legal.open = false;
    render();
    return;
  }

  if (action === 'open-admin-unlock') {
    state.admin.unlockModalOpen = true;
    render();
    requestAnimationFrame(() => {
      const input = document.getElementById('admin-passphrase');
      if (input instanceof HTMLInputElement) input.focus();
    });
    return;
  }
  if (action === 'admin-unlock-close') {
    state.admin.unlockModalOpen = false;
    render();
    return;
  }
  if (action === 'admin-unlock-submit') {
    const input = document.getElementById('admin-passphrase');
    if (!(input instanceof HTMLInputElement)) return;
    const pass = (input.value || '').trim();
    if (!pass) {
      alert(t('请输入口令。', 'Please enter the passphrase.'));
      input.focus();
      return;
    }
    (async () => {
      try {
        const hex = await sha256Hex(pass);
        if (hex !== ADMIN_PASSPHRASE_SHA256) {
          alert(t('口令不正确。', 'Incorrect passphrase.'));
          input.focus();
          return;
        }
        const now = Date.now();
        state.admin.unlocked = true;
        state.admin.unlockedAt = now;
        state.admin.unlockModalOpen = false;
        try {
          localStorage.setItem('aura_admin_unlocked', '1');
          localStorage.setItem('aura_admin_unlocked_at', String(now));
        } catch {}
        render();
        location.hash = '#/admin';
      } catch {
        alert(t('解锁失败，请稍后重试。', 'Unlock failed. Please try again.'));
      }
    })();
    return;
  }
  if (action === 'admin-lock') {
    state.admin.unlocked = false;
    state.admin.unlockedAt = 0;
    state.admin.unlockModalOpen = false;
    try {
      localStorage.removeItem('aura_admin_unlocked');
      localStorage.removeItem('aura_admin_unlocked_at');
    } catch {}
    render();
    return;
  }

  if (action === 'admin-easter-egg') {
    const now = Date.now();
    if (now - (state.admin.eggLastAt || 0) > 1500) {
      state.admin.eggClicks = 0;
    }
    state.admin.eggLastAt = now;
    state.admin.eggClicks = (state.admin.eggClicks || 0) + 1;
    if (state.admin.eggClicks >= 7) {
      state.admin.eggClicks = 0;
      state.admin.unlockModalOpen = true;
      render();
      requestAnimationFrame(() => {
        const input = document.getElementById('admin-passphrase');
        if (input instanceof HTMLInputElement) input.focus();
      });
    }
    return;
  }

  if (action === 'toggle-lang') {
    setLang(state.lang === 'zh' ? 'en' : 'zh');
    return;
  }
  if (action === 'toggle-mobile-menu') {
    state.mobileMenuOpen = !state.mobileMenuOpen;
    render();
    return;
  }
  if (action === 'close-mobile-menu') {
    state.mobileMenuOpen = false;
    render();
    return;
  }
  if (action === 'select-plot') {
    const id = el.getAttribute('data-plot-id');
    const plot = PLOTS.find((p) => p.id === id);
    if (!plot || plot.status === 'unavailable' || plot.status === 'rented') return;
    state.selectedPlotId = id;
    render();
    return;
  }
  if (action === 'clear-selected-plot') {
    state.selectedPlotId = null;
    render();
    return;
  }
  if (action === 'set-lang') {
    const l = el.getAttribute('data-lang');
    if (l === 'zh' || l === 'en') setLang(l);
    return;
  }
  if (action === 'open-plot-book-modal') {
    const pid = el.getAttribute('data-plot-id') || 'A01';
    state.ui.plotBookModalOpen = true;
    state.ui.plotBookModalPlotId = pid;
    render();
    return;
  }
  if (action === 'close-plot-book-modal') {
    state.ui.plotBookModalOpen = false;
    render();
    return;
  }
  if (action === 'plot-book-pick') {
    const pickRaw = el.getAttribute('data-pick') || 'email';
    const pid = el.getAttribute('data-plot-id') || 'A01';
    state.ui.bookingEntryMode = pickRaw === 'survey' ? 'survey' : 'email';
    state.ui.plotBookModalOpen = false;
    ensureBookingFormForPlot(pid);
    if (pickRaw === 'survey') {
      window.open(BOOKING_SURVEY_URL, '_blank', 'noopener,noreferrer');
    }
    location.hash = `#/booking/${String(pid).toUpperCase()}`;
    render();
    return;
  }
  if (action === 'bf-want-seeds') {
    state.bookingForm.wantSeeds = el.getAttribute('data-val') === 'true';
    if (!state.bookingForm.wantSeeds) state.bookingForm.seeds = [];
    render();
    return;
  }
  if (action === 'bf-tool') {
    const v = el.getAttribute('data-val');
    if (v === 'yes' || v === 'no') state.bookingForm.toolPack = v;
    render();
    return;
  }
  if (action === 'bf-toggle-day') {
    const d = el.getAttribute('data-day');
    if (d === 'fri') state.bookingForm.dayFri = !state.bookingForm.dayFri;
    else if (d === 'sat') state.bookingForm.daySat = !state.bookingForm.daySat;
    else if (d === 'sun') state.bookingForm.daySun = !state.bookingForm.daySun;
    render();
    return;
  }
  if (action === 'bf-time') {
    const v = el.getAttribute('data-val');
    if (v === 'morning' || v === 'afternoon' || v === 'unsure') state.bookingForm.timeSlot = v;
    render();
    return;
  }
  if (action === 'booking-seed-add') {
    const sel = document.getElementById('bf-seed-pick');
    if (!(sel instanceof HTMLSelectElement)) return;
    const code = (sel.value || '').trim();
    if (!code) {
      alert(t('请先选择要添加的种子品种。', 'Please choose a seed variety first.'));
      sel.focus();
      return;
    }
    if (state.bookingForm.seeds.includes(code)) return;
    state.bookingForm.seeds = [...state.bookingForm.seeds, code];
    sel.value = '';
    render();
    return;
  }
  if (action === 'booking-seed-remove') {
    const idx = Number.parseInt(el.getAttribute('data-seed-index') || '', 10);
    if (!Number.isFinite(idx)) return;
    state.bookingForm.seeds = (state.bookingForm.seeds || []).filter((_, j) => j !== idx);
    render();
    return;
  }
  if (action === 'set-duration') {
    const v = el.getAttribute('data-duration');
    const wrap = document.getElementById('custom-duration-wrap');
    const summaryDur = document.getElementById('summary-duration');
    if (!wrap || !summaryDur) return;
    if (v === 'custom') {
      wrap.classList.remove('hidden');
      summaryDur.textContent = '(自定义时长)';
    } else {
      wrap.classList.add('hidden');
      summaryDur.textContent = `(${v}个月)`;
    }
  }
  if (action === 'toggle-claim-bookings-view') {
    state.dashboard.showAllClaimBookings = !state.dashboard.showAllClaimBookings;
    render();
    return;
  }
  if (action === 'open-visit-modal') {
    state.dashboard.visitModalOpen = true;
    render();
    return;
  }
  if (action === 'open-booking-detail') {
    const kind = el.getAttribute('data-booking-kind') === 'claim' ? 'claim' : 'visit';
    const idRaw = el.getAttribute('data-booking-id') || '';
    const idNum = Number.parseInt(idRaw, 10);
    const list = kind === 'claim' ? (state.dashboard.claimBookings || []) : (state.dashboard.visitBookings || []);
    const found = list.find((b) => (typeof b.id === 'number' ? b.id === idNum : String(b.id || '') === idRaw));
    if (!found) return;
    state.dashboard.viewBooking = { kind, data: found };
    state.dashboard.viewBookingModalOpen = true;
    render();
    return;
  }
  if (action === 'close-booking-detail') {
    state.dashboard.viewBookingModalOpen = false;
    state.dashboard.viewBooking = null;
    render();
    return;
  }
  if (action === 'visit-close') {
    state.dashboard.visitModalOpen = false;
    render();
    return;
  }
  if (action === 'visit-submit') {
    const dateEl = document.getElementById('visit-date');
    const slotEl = document.getElementById('visit-slot');
    const countEl = document.getElementById('visit-count');
    const noteEl = document.getElementById('visit-note');
    if (!(dateEl instanceof HTMLInputElement) || !(slotEl instanceof HTMLSelectElement) || !(countEl instanceof HTMLInputElement)) return;
    const date = (dateEl.value || '').trim();
    const slot = (slotEl.value || '').trim();
    const countRaw = (countEl.value || '').trim();
    const count = Number.parseInt(countRaw, 10);
    const note = noteEl && 'value' in noteEl ? String(noteEl.value || '').trim() : '';
    if (!date) {
      alert(t('请填写入场日期。', 'Please enter a visit date.'));
      dateEl.focus();
      return;
    }
    if (!slot) {
      alert(t('请选择时间段。', 'Please select a time slot.'));
      slotEl.focus();
      return;
    }
    if (!Number.isFinite(count) || count <= 0) {
      alert(t('请填写有效的入场人数（>= 1）。', 'Please enter a valid guest count (>= 1).'));
      countEl.focus();
      return;
    }
    const nextId = (state.dashboard.visitBookings || []).reduce((max, b) => {
      const idNum = typeof b.id === 'number' ? b.id : 0;
      return Math.max(max, idNum);
    }, 0) + 1;
    state.dashboard.visitBookings = [
      ...(state.dashboard.visitBookings || []),
      {
        id: nextId,
        date,
        time: slot,
        count,
        status: 'upcoming',
        plot: 'A01',
        note: note || t('入场预约（自动创建）。', 'Visit booking (created from dashboard).'),
      },
    ];
    state.dashboard.visitModalOpen = false;
    alert(t('已提交入场预约，我们会通过邮件与您确认具体安排。', 'Visit booking submitted. We will confirm details via email.'));
    render();
    return;
  }
  if (action === 'confirm-booking') {
    const nameEl = document.getElementById('bf-name');
    const partEl = document.getElementById('bf-participants');
    const kidEl = document.getElementById('bf-kidname');
    const agree = document.getElementById('agree');
    if (!(agree instanceof HTMLInputElement)) return;

    if (nameEl && 'value' in nameEl) state.bookingForm.name = String(nameEl.value || '');
    if (partEl && 'value' in partEl) {
      const n = Number.parseInt(String(partEl.value || '1'), 10);
      state.bookingForm.participants = Number.isFinite(n) && n >= 1 ? n : 1;
    }
    if (kidEl && 'value' in kidEl) state.bookingForm.kidName = String(kidEl.value || '');
    state.bookingForm.agreed = agree.checked;

    const plotUpper = String(parseRoute()?.params?.id || state.bookingForm.plotId || 'A01').toUpperCase();
    const bf = state.bookingForm;

    if (!(bf.name || '').trim()) {
      alert(t('请填写姓名。', 'Please enter your name.'));
      if (nameEl && 'focus' in nameEl) nameEl.focus();
      return;
    }
    if (!bf.participants || bf.participants < 1) {
      alert(t('请填写有效的参与人数（>= 1）。', 'Please enter a valid guest count (>= 1).'));
      if (partEl && 'focus' in partEl) partEl.focus();
      return;
    }
    if (!bf.toolPack) {
      alert(t('请选择是否需要工具包。', 'Please choose whether you need a tool package.'));
      return;
    }
    const hasDay = bf.dayFri || bf.daySat || bf.daySun;
    if (!hasDay) {
      alert(t('请至少选择一天种植日（周五/周六/周日）。', 'Please pick at least one planting day (Fri/Sat/Sun).'));
      return;
    }
    if (!bf.timeSlot) {
      alert(t('请选择时间段。', 'Please select a time slot.'));
      return;
    }
    if (bf.wantSeeds && !(bf.seeds || []).length) {
      alert(t('您选择了认领种子，请至少添加一个品种。', 'You chose seeds—please add at least one variety.'));
      return;
    }
    if (!bf.agreed) return;

    const isZh = state.lang === 'zh';
    const p = bookingPayloadSnapshot(plotUpper);

    const seedsLine = !p.wantSeeds
      ? (isZh ? '否' : 'No')
      : ((p.seedLabels && p.seedLabels.length)
        ? p.seedLabels.join(isZh ? '、' : ', ')
        : (isZh ? '是（待添加）' : 'Yes (pending)'));

    const toolLine = p.toolPack === 'yes' ? (isZh ? '需要' : 'Yes') : p.toolPack === 'no' ? (isZh ? '不需要' : 'No') : '—';

    const dayParts = [];
    if (p.dayFri) dayParts.push(isZh ? '周五' : 'Fri');
    if (p.daySat) dayParts.push(isZh ? '周六' : 'Sat');
    if (p.daySun) dayParts.push(isZh ? '周日' : 'Sun');
    const daysLine = dayParts.length ? dayParts.join(isZh ? '、' : ', ') : '—';

    const timeLabel = p.timeSlot === 'morning'
      ? (isZh ? '上午' : 'Morning')
      : p.timeSlot === 'afternoon'
        ? (isZh ? '下午' : 'Afternoon')
        : p.timeSlot === 'unsure'
          ? (isZh ? '不确定' : 'Unsure')
          : '—';

    const nextId = (state.dashboard.claimBookings || []).reduce((max, b) => {
      const idNum = typeof b.id === 'number' ? b.id : 0;
      return Math.max(max, idNum);
    }, 0) + 1;

    state.dashboard.claimBookings = [
      ...(state.dashboard.claimBookings || []),
      {
        id: nextId,
        claimVersion: 2,
        plot: plotUpper,
        name: String((bf.name || '').trim()),
        participants: bf.participants,
        kidName: bf.kidName || '',
        wantSeeds: bf.wantSeeds,
        seedLabels: [...(bf.seeds || []).map(seedOptionLabel)],
        seedsLine,
        toolPack: bf.toolPack,
        toolLine,
        daysLine,
        timeSlot: bf.timeSlot,
        timeLabel,
        status: 'pending',
        note: isZh
          ? '通过网页提交的认领申请（演示数据）。'
          : 'Claim request submitted via web demo.',
      },
    ];

    state.ui.bookingSubmitPanel = { plotUpper, ...p };
    render();
    return;
  }
  if (action === 'booking-open-mail') {
    const panel = state.ui.bookingSubmitPanel;
    if (!panel || !panel.plotUpper) return;
    const { plotUpper, ...rest } = panel;
    openClaimBookingMailto(plotUpper, rest);
    return;
  }
  if (action === 'booking-copy-full') {
    const panel = state.ui.bookingSubmitPanel;
    if (!panel || !panel.plotUpper) return;
    const { plotUpper, ...rest } = panel;
    const text = buildClaimBookingFullCopyText(plotUpper, rest);
    (async () => {
      const ok = await copyTextToClipboard(text);
      alert(ok
        ? t('已复制到剪贴板。', 'Copied to clipboard.')
        : t('复制失败，请手动选择文本复制。', 'Copy failed. Please copy manually.'));
    })();
    return;
  }
  if (action === 'save-settings') {
    persistUser();
    alert(t('已保存到本地账户设置。', 'Saved to local account settings.'));
    return;
  }
}

function onInput(e) {
  const t = e.target;
  if (!(t instanceof HTMLElement)) return;

  if (t.id === 'booking-date') {
    const summary = document.getElementById('summary-date');
    if (summary && summary.childNodes[0]) {
      const v = 'value' in t ? String(t.value || '').trim() : '';
      summary.childNodes[0].textContent = v || (state.lang === 'zh' ? '待沟通' : 'TBD');
    }
  }
  if (t.id === 'custom-duration') {
    const summaryDur = document.getElementById('summary-duration');
    if (summaryDur && 'value' in t) {
      const v = String(t.value || '').trim();
      summaryDur.textContent = `(${v || (state.lang === 'zh' ? '自定义时长' : 'Custom')})`;
    }
  }
  if (t.id === 'bf-name' && t instanceof HTMLInputElement) {
    state.bookingForm.name = t.value;
    const el = document.getElementById('summary-bf-name');
    if (el) el.textContent = (state.bookingForm.name || '').trim() || '—';
    updateConfirmBookingButton();
  }
  if (t.id === 'bf-participants' && t instanceof HTMLInputElement) {
    const n = Number.parseInt(String(t.value || '1'), 10);
    state.bookingForm.participants = Number.isFinite(n) && n >= 1 ? n : 1;
    const el = document.getElementById('summary-bf-participants');
    if (el) el.textContent = String(state.bookingForm.participants);
    updateConfirmBookingButton();
  }
  if (t.id === 'bf-kidname' && t instanceof HTMLInputElement) {
    state.bookingForm.kidName = t.value;
    const el = document.getElementById('summary-bf-kid');
    if (el) el.textContent = (state.bookingForm.kidName || '').trim() || '—';
  }
  if (t.id === 'agree' && t instanceof HTMLInputElement) {
    state.bookingForm.agreed = t.checked;
    updateConfirmBookingButton();
  }
  if (t.id === 'seed-type') {
    const sel = t;
    if (!(sel instanceof HTMLSelectElement)) return;
    const summarySeed = document.getElementById('summary-seed');
    if (summarySeed) {
      const label = sel.value ? (sel.options[sel.selectedIndex]?.textContent || '').trim() : (state.lang === 'zh' ? '待选择' : 'Not selected');
      summarySeed.textContent = label || (state.lang === 'zh' ? '待选择' : 'Not selected');
    }
  }
  if (t.id === 'seed-qty') {
    const input = t;
    if (!(input instanceof HTMLInputElement)) return;
    const summaryQty = document.getElementById('summary-qty');
    if (summaryQty) {
      const v = (input.value || '').trim();
      summaryQty.textContent = v ? v : '—';
    }
  }
}

function onChange(e) {
  const t = e.target;
  if (!(t instanceof HTMLElement)) return;
  if (t.id === 'agree' && t instanceof HTMLInputElement) {
    state.bookingForm.agreed = t.checked;
    updateConfirmBookingButton();
  }
}

window.addEventListener('hashchange', () => {
  state.mobileMenuOpen = false;
  render();
});
document.addEventListener('click', onClick);
document.addEventListener('input', onInput);
document.addEventListener('change', onChange);

// init theme (before first render) — dark mode disabled, always light
(() => {
  try { localStorage.removeItem('aura_dark'); } catch {}
  document.documentElement.classList.remove('dark');
})();

// init user (demo)
(() => {
  try {
    const raw = localStorage.getItem('aura_user');
    if (!raw) return;
    const u = JSON.parse(raw);
    if (u && typeof u === 'object') {
      state.user.displayName = typeof u.displayName === 'string' ? u.displayName : '';
      state.user.phone = typeof u.phone === 'string' ? u.phone : '';
      state.user.email = typeof u.email === 'string' ? u.email : '';
    }
  } catch {}
})();

// init admin (hidden)
(() => {
  try {
    state.admin.unlocked = localStorage.getItem('aura_admin_unlocked') === '1';
    const ts = Number.parseInt(localStorage.getItem('aura_admin_unlocked_at') || '0', 10);
    state.admin.unlockedAt = Number.isFinite(ts) ? ts : 0;
  } catch {}
})();

if (!location.hash) location.hash = '#/';
render();

