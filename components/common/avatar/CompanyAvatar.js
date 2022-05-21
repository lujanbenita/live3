const CompanyAvatar = ({ src, alt }) => (
  <div className="c-company-avatar">
    <div
      className="c-company-avatar__image"
      alt={alt}
      style={{ background: `url(${src})` }}
    />
  </div>
);

export default CompanyAvatar;
