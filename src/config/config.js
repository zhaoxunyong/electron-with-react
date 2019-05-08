/**
 系统菜单，请参考以下的配置：
[
    {
        "id": "demo",
        "text": "测试",
        "url": "/demo"
    },
    {
        "id": "finance_config",
        "text": "財務管理",
        "children": [
            {
                "id": "finance",
                "text": "財務放款",
                "children": [
                    {
                        "id": "UnconfirmedReturnReceipt",
                        "text": "APO待回執確認",
                        "url": "/finance/goToUnconfirmedReturnReceipt"
                    }
                ]
            }
        ]
    },
    {
        "id": "loan_account_config",
        "text": "貸款賬戶管理",
        "children": [
            {
                "id": "loan_account_list_config",
                "text": "貸款賬戶列表",
                "url": "/loanAccount/toQueryLoanAccountList"
            },
            {
                "id": "loan_account_list_wait_posting_config",
                "text": "待入賬賬戶列表",
                "url": "/loanAccount/toQueryLoanAccountListForWaitPosting"
            }
        ]
    }
] */
export const MENU_URL = '/api/getMenuLosJson'
