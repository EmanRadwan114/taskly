import Image from 'next/image';

interface IProps {
  imgSrc: string;
  text: string;
  variant?: 'empty' | 'error';
}

const SearchStatus: React.FC<IProps> = ({
  imgSrc,
  text,
  variant = 'empty',
}) => {
  const variantStyle = {
    empty: 'text-slate-dark',
    error: 'text-error-dark',
  };

  return (
    <section className="lg:min-h-[50vh] flex items-center justify-center sm:max-w-3/4 xl:max-w-2/3 sm:mx-auto">
      <div className="flex flex-col justify-center items-center gap-4">
        <Image
          src={imgSrc}
          width={200}
          height={200}
          alt={text}
          className="-mb-7"
        />
        <h1
          className={`font-semibold text-heading-4 letter-spacing-xs text-center ${variantStyle[variant]}`}
        >
          {text}
        </h1>
      </div>
    </section>
  );
};

export default SearchStatus;
