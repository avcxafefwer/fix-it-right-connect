import React from "react";

type Props = {
  user: string;
  domain: string;
  className?: string;
  title?: string;
};

// Renders a link that assembles the email address in JS to avoid plain text in HTML
const EmailLink: React.FC<Props> = ({ user, domain, className, title }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = `${user}@${domain}`;
    window.location.href = `mailto:${email}`;
  };

  // Visible text purposely obfuscated using HTML entities to reduce naive scrapers
  const obfuscated = `${user.replace(/./g, (c) => `&#${c.charCodeAt(0)};`)}&#64;${domain.replace(/./g, (c) => `&#${c.charCodeAt(0)};`)};`;

  return (
    <a
      href="#email"
      onClick={handleClick}
      className={className}
      title={title}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: obfuscated }}
    />
  );
};

export default EmailLink;
