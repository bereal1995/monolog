import AccountSetting from './AccountSetting'

import BasicLayout from '@/components-shared/layouts/BasicLayout'

function AccountContainer() {
  return (
    <BasicLayout title="내 계정" hasBackButton>
      <AccountSetting />
    </BasicLayout>
  )
}

export default AccountContainer
