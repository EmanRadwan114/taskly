import WarningIcon from '@/assets/icons/warning.svg';

interface FetchDataErrorMsgProps {
  message?: string;
}

const FetchDataErrorMsg: React.FC<FetchDataErrorMsgProps> = ({
  message = 'Failed to fetch data',
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-error-dark py-4 text-heading-5 font-medium w-full">
      <WarningIcon className="size-16" />
      <p>{message}</p>
    </div>
  );
};

export default FetchDataErrorMsg;
