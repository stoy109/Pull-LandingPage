export function FeatureIcon({ name }) {
  const common = {
    viewBox: '0 0 80 80',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true,
  }

  if (name === 'price') {
    return (
      <svg {...common}>
        <path d="M15 20h31l18 18-27 27-22-22V20Z" stroke="currentColor" strokeWidth="3" />
        <circle cx="27" cy="31" r="4" fill="currentColor" />
        <path d="M47 22v30m0 0-9-9m9 9 9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (name === 'people') {
    return (
      <svg {...common}>
        <circle cx="27" cy="27" r="9" stroke="currentColor" strokeWidth="3" />
        <circle cx="55" cy="31" r="7" stroke="currentColor" strokeWidth="3" />
        <path d="M11 63c1-14 8-21 17-21s16 7 17 21M47 46c10-4 20 3 21 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="m48 17 7-7m0 0h-8m8 0v8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (name === 'store') {
    return (
      <svg {...common}>
        <path d="M16 33h48v34H16V33Z" stroke="currentColor" strokeWidth="3" />
        <path d="M11 32 18 14h44l7 18M20 33c0 7 10 7 10 0 0 7 10 7 10 0 0 7 10 7 10 0 0 7 10 7 10 0" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M33 67V51h15v16" stroke="currentColor" strokeWidth="3" />
      </svg>
    )
  }

  if (name === 'pool') {
    return (
      <svg {...common}>
        <rect x="9" y="12" width="24" height="22" rx="3" stroke="currentColor" strokeWidth="3" />
        <rect x="47" y="12" width="24" height="22" rx="3" stroke="currentColor" strokeWidth="3" />
        <rect x="28" y="50" width="24" height="22" rx="3" stroke="currentColor" strokeWidth="3" />
        <path d="M21 34v8h19m19-8v8H40m0 0v8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="m36 19 4-2 4 2-4 2-4-2Zm15 0 4-2 4 2-4 2-4-2Z" fill="currentColor" />
      </svg>
    )
  }

  if (name === 'work') {
    return (
      <svg {...common}>
        <rect x="11" y="18" width="58" height="46" rx="5" stroke="currentColor" strokeWidth="3" />
        <path d="M29 18v-7h22v7M11 35h58" stroke="currentColor" strokeWidth="3" />
        <path d="M33 35v8h14v-8" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="m56 53 4 4 8-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M11 11h22v22H11V11Zm36 0h22v22H47V11ZM11 47h22v22H11V47Z" stroke="currentColor" strokeWidth="3" />
      <path d="M18 18h8v8h-8v-8Zm36 0h8v8h-8v-8ZM18 54h8v8h-8v-8Zm30-7h8v8h-8v-8Zm13 0h8v15H54v7h-7V59h14V47Zm1 15h7v7h-7v-7Z" fill="currentColor" />
    </svg>
  )
}

export function HeroRouteArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <svg viewBox="0 0 760 720" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="hero-art__orbit" d="M94 502C23 326 158 101 369 88c185-11 352 124 334 309-18 186-210 261-379 214-140-39-224-136-182-260 31-92 133-132 220-99" />
        <path className="hero-art__path" d="M35 592c91-22 158-4 199 50 45 59 108 62 189 11 67-43 129-39 185 10" />
        <g className="hero-art__node hero-art__node--one">
          <circle cx="96" cy="503" r="23" />
          <circle cx="96" cy="503" r="6" fill="currentColor" />
        </g>
        <g className="hero-art__node hero-art__node--two">
          <circle cx="615" cy="190" r="18" />
          <circle cx="615" cy="190" r="5" fill="currentColor" />
        </g>
        <g className="hero-cart">
          <path d="M241 270h288l-37 190-212 25-39-215Z" fill="#F3EAD5" stroke="#071F17" strokeWidth="8" strokeLinejoin="round" />
          <path d="m260 313 250-15M274 368l225-17M286 424l201-16M332 278l14 195m60-202 3 194m72-188-10 177" stroke="#0B3B2B" strokeWidth="5" opacity=".7" />
          <path d="M243 271 218 211h-74" stroke="#F7D547" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M279 486h229" stroke="#F7D547" strokeWidth="16" strokeLinecap="round" />
          <g className="hero-cart__wheel hero-cart__wheel--one">
            <circle cx="318" cy="541" r="42" fill="#F26A2E" stroke="#071F17" strokeWidth="8" />
            <circle cx="318" cy="541" r="13" fill="#F7D547" />
            <path d="M318 504v74m-37-37h74" stroke="#071F17" strokeWidth="5" />
          </g>
          <g className="hero-cart__wheel hero-cart__wheel--two">
            <circle cx="466" cy="541" r="42" fill="#B9F33D" stroke="#071F17" strokeWidth="8" />
            <circle cx="466" cy="541" r="13" fill="#F7D547" />
            <path d="M466 504v74m-37-37h74" stroke="#071F17" strokeWidth="5" />
          </g>
          <g className="hero-cart__crate hero-cart__crate--one">
            <rect x="289" y="190" width="91" height="87" rx="9" fill="#B9F33D" stroke="#071F17" strokeWidth="7" />
            <path d="m289 217 46 20 45-20m-45 20v40" stroke="#071F17" strokeWidth="5" />
          </g>
          <g className="hero-cart__crate hero-cart__crate--two">
            <rect x="393" y="158" width="106" height="113" rx="9" fill="#F26A2E" stroke="#071F17" strokeWidth="7" />
            <path d="m393 191 53 23 53-23m-53 23v57" stroke="#071F17" strokeWidth="5" />
            <circle cx="447" cy="181" r="8" fill="#F7D547" />
          </g>
          <path d="M541 332c42-47 79-63 111-47" stroke="#F7D547" strokeWidth="7" strokeLinecap="round" strokeDasharray="2 18" />
          <path d="m640 267 18 18-21 14" stroke="#F7D547" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
      <div className="hero-art__badge">
        <strong>28%</strong>
        <span>lebih hemat</span>
      </div>
      <span className="hero-art__label hero-art__label--solo">SOLO</span>
      <span className="hero-art__label hero-art__label--raya">RAYA</span>
    </div>
  )
}

export function JourneyPath() {
  return (
    <svg className="journey-path" viewBox="0 0 1440 540" preserveAspectRatio="none" aria-hidden="true">
      <path d="M-20 350C111 109 247 487 393 283c106-148 183-168 292-39 144 171 245-121 394-75 132 41 174 238 390 43" />
      <g>
        <circle cx="141" cy="275" r="17" />
        <circle cx="141" cy="275" r="5" fill="currentColor" />
        <circle cx="687" cy="247" r="17" />
        <circle cx="687" cy="247" r="5" fill="currentColor" />
        <circle cx="1192" cy="244" r="17" />
        <circle cx="1192" cy="244" r="5" fill="currentColor" />
      </g>
    </svg>
  )
}

export function PhaseIllustration({ type }) {
  if (type === 'entry') {
    return (
      <div className="phase-visual phase-visual--entry" aria-hidden="true">
        <div className="browser-frame">
          <div className="browser-frame__top"><i /><i /><i /><span>Pull.id/mulai</span></div>
          <div className="browser-frame__body">
            <span className="mini-logo">p</span>
            <div><b>Halo, Sugeng Rawuh!</b><small>Masuk ke jaringan UMKM Solo Raya.</small></div>
            <span className="fake-input">email@usahamu.id</span>
            <span className="fake-button">Lanjutkan</span>
          </div>
        </div>
        <div className="otp-ticket"><span>OTP WHATSAPP</span><strong>2 8 0 7</strong><i>TERVERIFIKASI ✓</i></div>
        <span className="phase-stamp">TANPA<br />INSTALL</span>
      </div>
    )
  }

  if (type === 'transaction') {
    return (
      <div className="phase-visual phase-visual--transaction" aria-hidden="true">
        <svg viewBox="0 0 560 500" fill="none">
          <path d="M84 267c68-153 191-164 281-51 75 94 64 190 138 215" stroke="currentColor" strokeWidth="4" strokeDasharray="5 14" />
          <path d="M93 127c96-66 238-42 317 55" stroke="currentColor" strokeWidth="4" strokeDasharray="5 14" />
          <circle cx="90" cy="129" r="13" fill="#F7D547" />
          <circle cx="83" cy="269" r="13" fill="#F7D547" />
          <circle cx="411" cy="183" r="13" fill="#F7D547" />
          <circle cx="504" cy="430" r="13" fill="#F7D547" />
        </svg>
        <div className="pool-ticket"><small>POOL #018</small><strong>Minyak goreng</strong><span><b>18</b> UMKM bergabung</span><i>72% terpenuhi</i></div>
        <div className="job-ticket"><span>Butuh hari ini</span><strong>2 kru produksi</strong><small>Laweyan · 08.00–17.00</small><i>Lamar cepat ↗</i></div>
        <div className="chat-bubble">Harga aman?<strong>Bisa nego langsung ↗</strong></div>
      </div>
    )
  }

  return (
    <div className="phase-visual phase-visual--finish" aria-hidden="true">
      <div className="profile-card">
        <span className="profile-card__photo">SB</span>
        <small>UMKM TERVERIFIKASI</small>
        <strong>Sambal Bu Tari</strong>
        <span>Pasar Gede, Surakarta</span>
        <div className="stars">★★★★★ <b>4.9</b></div>
        <div className="trust"><i style={{ '--score': '.92' }} /><span>Trust Score 92</span></div>
      </div>
      <div className="qr-card">
        <div className="qr-pattern"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <strong>SCAN PROFIL</strong>
      </div>
      <div className="points-ticket"><small>PULLPOINTS</small><strong>+240</strong><span>Transaksi selesai ✓</span></div>
      <span className="verified-seal">PULL<br />VERIFIED</span>
    </div>
  )
}
