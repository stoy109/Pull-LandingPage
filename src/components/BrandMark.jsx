import logoUrl from '../../logo.svg'

export default function BrandMark({ compact = false }) {
  return (
    <a className="brand" href="#beranda" aria-label="Pull, kembali ke beranda">
      <span className="brand__icon" aria-hidden="true">
        <img src={logoUrl} alt="" />
      </span>
      {!compact && <span className="brand__word">Pull</span>}
    </a>
  )
}
