import { components, OptionProps, GroupBase } from 'react-select';
import EpicAvatar from './EpicAvatar';
import { getNameInitials } from '@/shared/utils/functions.client.utils';

export interface MemberSelectOption {
  value: string | number;
  label: string;
  avatarName?: string;
}

const MembersOption = (
  props: OptionProps<MemberSelectOption, false, GroupBase<MemberSelectOption>>
) => {
  const { data } = props;
  const displayName = data.avatarName || data.label;

  return (
    <components.Option {...props}>
      <div className="flex items-center gap-2 cursor-pointer">
        <span>
          <EpicAvatar
            className="bg-surface-dark text-slate-dark/80!"
            content={displayName ? getNameInitials(displayName) : 'Unassigned'}
          />
        </span>
        <span>{data.label}</span>
      </div>
    </components.Option>
  );
};

export default MembersOption;
