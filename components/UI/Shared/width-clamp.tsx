interface Props {
  children: React.ReactNode;
  addClass?: string;
}

const WidthClamp: React.FC<Props> = ({ children, addClass }: Props) => {
  return <div className={`md:max-w-[1288px] w-11/12 mx-auto ${addClass && addClass}`}>{children}</div>;
};

export default WidthClamp;
