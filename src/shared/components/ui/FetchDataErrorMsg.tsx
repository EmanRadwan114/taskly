import WarningIcon from '@/assets/icons/warning.svg';

interface FetchDataErrorMsgProps {
  message?: string;
}

const FetchDataErrorMsg: React.FC<FetchDataErrorMsgProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center gap-2 text-error-dark py-4 text-body-sm">
      <WarningIcon className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};

export default FetchDataErrorMsg;
