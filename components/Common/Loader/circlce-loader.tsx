interface LoaderProps {}

const CircleLoader: React.FC<LoaderProps> = ({}: LoaderProps) => {
  return (
    <div className="backdrop-blur-md fixed z-[100] w-full h-full flex items-center justify-center">
      <div id="loader"></div>
    </div>
  );
};

export default CircleLoader;
