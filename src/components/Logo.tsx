import './../styles/Logo.css';

interface LogoProps {
  url: string;
  alt: string;
}

const Logo = ({ url, alt }: LogoProps) => {
  return <img src={url} className="logo" data-testid="logo" alt={alt} />;
};

export default Logo;
