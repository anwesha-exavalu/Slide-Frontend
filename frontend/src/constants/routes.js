import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';
import PolicyDetails from 'pages/PolicyDetails';
import BindForms from 'pages/Bind/BindQuoteForms';
import BindAdditionalInfo from 'pages/Bind/BindAdditionalInfo';
import SearchQuote from 'pages/SearchQuote';
import Comproperty from 'pages/CreateQuote/ComProperty';
import SearchPolicy from 'pages/SearchPolicy';
import Accountsetting from 'pages/Setting/AccountSetting';
import UploadDocuments from 'pages/Documents';
import PendingIssuance from 'pages/Dashboard/DashboardSubFeatures/PendingIssuance';
import ExpiringPolicies from 'pages/Dashboard/DashboardSubFeatures/ExpiringPolicies';
import NonRenewals from 'pages/Dashboard/DashboardSubFeatures/NonRenewal';
import RollOverSuspense from 'pages/Dashboard/DashboardSubFeatures/RollOverSuspense';
import ReportingAnalytics from 'pages/ReportingAnalytics';
import Reports from 'pages/Reports';
import Claim from 'pages/ClaimDetails/Claim';
import CustomerDetails from 'pages/CustomerDetails';
import SearchClaims from 'pages/ClaimDetails/SearchClaims';
import ClaimDetails from 'pages/ClaimDetails';
import Expiringreport from 'pages/Reports/ExpiringReport';
import CommissionStatements from 'pages/CommissionStatements';
import RecentlyViewedPolicy from 'pages/Dashboard/DashboardSubFeatures/ManageViewedPolicy';
import Billing from 'pages/Billing';
import PrivacyPolicy from 'pages/PrivacyPolicy';
import StartTransaction from 'pages/StartTransaction';
import ContactUs from 'pages/ContactUs';
import TermsOfUse from 'pages/TermsOfUse';
import AgentRegistration from 'pages/Registration/AgentRegistration';
import Flood from 'pages/CreateQuote/Flood/Flood';
import HomeOwners from 'pages/HomeOwners';
import AutomaticCommAuto from 'pages/AutomaticQuote/AutomaticCommAuto';
import AutomaticQuote from 'pages/AutomaticQuote';
import Allpayment from 'pages/Dashboard/DashboardSubFeatures/Allpayment';
import ProducerProduction from 'pages/Dashboard/DashboardSubFeatures/ProducerProduction';
import Premiumtrust from 'pages/Dashboard/DashboardSubFeatures/Premiumtrust';
import Producerlossratio from 'pages/Dashboard/DashboardSubFeatures/Producerlossratio';
import BulkQuote from 'pages/BulkQuote/BulkQuote';
import HeraldProduct from 'pages/Herald/HeraldProduct';
import HeraldForm from 'pages/Herald/HeraldForm';
import QuotePage from 'pages/Herald/QuotePage';
import UploadFile from 'pages/Herald/UploadFile';

export const LoginRoute = {
    component: Login,
    path: '/',
    restricted: false,
}

export const DashboardRoute = {
    component: Dashboard,
    path: '/',
    restricted: true,
}

export const PolicyDetailsRoute = {
  component: PolicyDetails,
  path: '/policy-details',
  restricted: true,
}
export const BindQuoteRoute = {
    component: BindAdditionalInfo,
    path: '/bindQuote',
    restricted: true
}

export const BindQuoteFormsRoute = {
    component: BindForms,
    path: '/bindQuoteForms',
    restricted: true
}
export const SearchPolicyRoute = {
  component: SearchPolicy,
  path: '/search-policy',  
  restricted: true,
}

export const SearchQuotedRoute = {
    component: SearchQuote,
    path: '/search-quote',
    restricted: true,
}

export const PendingIssuanceRoute = {
  component: PendingIssuance,
  path: '/policy-transactions',
  restricted: true,
}

export const ExpiringPoliciesRoute = {
  component: ExpiringPolicies,
  path: '/policies-in-force',
  restricted: true,
}

export const NonRenewalsRoute = {
  component: NonRenewals,
  path: '/pending-esignature',
  restricted: true,
}

export const RollOverSuspenseRoute = {
  component: RollOverSuspense,
  path: '/unpaid-cancels',
  restricted: true,
}

export const CommercialPropertyQuote = {
  component: Comproperty,
  path: '/commercial-auto',
  restricted: true,
}

export const HomeOwnersQuote = {
  component: HomeOwners,
  path: '/home-owners',
  restricted: true,
}

export const CreateFloodQuote = {
  component: Flood,
  path: '/flood',
  restricted: true,
}

export const UploadFileOption = {
  component: UploadFile,
  path: '/upload-file',
  restricted: true,
}

export const CreateHeraldProduct = {
  component: HeraldProduct,
  path: '/herald-product',
  restricted: true,
}
export const CreateHeraldForm = {
  component: HeraldForm,
  path: '/herald-form',
  restricted: true,
}

export const CreateQuotePage = {
  component: QuotePage,
  path: '/quote-page',
  restricted: true,
}
export const CreateQuoteDetails = {
  component: QuotePage,
  path: '/quotedetails',
  restricted: true,
}
export const AccountSettingsRoute = {
  component: Accountsetting,
  path: '/account-settings',
}

export const EditQuote = {
  component: Comproperty,
  path: '/edit-quote/:id',
  restricted: true,
}

export const UploadDocumentsRoute = {
  component: UploadDocuments,
  path: '/uploadDocuments',
  restricted: true,
}
export const ClaimRoute = {
  component: Claim,
  path: '/claim',
  restricted: true,
}

export const CustomerDetailsRoute = {
  component: CustomerDetails,
  path: '/customer-details',
  restricted: true,
}

export const SearchClaimsRoute = {
  component: SearchClaims,
  path: '/search-claim',
  restricted: true,
}

export const ViewClaimsRoute = {
  component: ClaimDetails,
  path: '/viewClaims',
  restricted: true,
}

export const reportingAnalytics = {
  component: ReportingAnalytics,
  path: '/reporting-analytics',
  restricted: true,
}

export const reports = {
  component: Reports,
  path: '/reports',
  restricted: true,
}

export const ExpiringreportsRoute = {
  component: Expiringreport,
  path: '/expire-reports',
  restricted: true,
}

export const CommissionStatementsRoute = {
  component: CommissionStatements,
  path: '/commissions',
  restricted: true,
}

export const StartTransactionRoute = {
    component: StartTransaction,
    path:'/start-transaction',
    restricted: true,
}
export const ManageViewedPolicyRoute = {
  component: RecentlyViewedPolicy,
  path: '/viewed-policy',
  restricted: true,
}

export const BillingRoute = {
  component: Billing,
  path: '/billing',
}
  
export const PrivacyPolicyRoute = {
  component: PrivacyPolicy,
  path: '/privacy',
  restricted: false,
}
  
export const ContactUsRoute = {
  component: ContactUs,
  path: '/contact',
  restricted: false,
}

export const TermsOfUseRoute = {
  component: TermsOfUse,
  path: '/termsofuse',
  restricted: false,
}

export const AgentregistrationRoute = {
  component: AgentRegistration,
  path: '/agentregistration',
  restricted: false,
}

export const AutomaticquoteRoute = {
  component: AutomaticQuote,
  path: '/automatic-quote',
  restricted: true,
}

export const AutoFillUpQuote = {
  component: AutomaticCommAuto,
  path: '/commauto-quote',
  restricted: true,
}

export const AlltransactionpaymentRoute = {
  component: Allpayment,
  path: '/allpayment',
  restricted: false,
}

export const ProducerProductionRoute = {
  component: ProducerProduction,
  path: '/producerproduction',
  restricted: false,
}
export const PremiumtrustRoute = {
  component: Premiumtrust,
  path: '/premiumtrust',
  restricted: false,
}

export const ProducerlossratioRoute = {
  component: Producerlossratio,
  path: '/producerlossratio',
  restricted: false,
}

export const BulkQuoteRoute = {
  component: BulkQuote,
  path: '/bulk-quote',
  restricted: false,
}

const IRouteS = {
    "UN_AUTH_ROUTES": [
      LoginRoute,
      PrivacyPolicyRoute,
      ContactUsRoute,
      TermsOfUseRoute,
      AgentregistrationRoute,
      ExpiringreportsRoute,
    ],
    "customer_login": [
      DashboardRoute,
      SearchQuotedRoute,
      CommercialPropertyQuote,
      HomeOwnersQuote,
      EditQuote,
      SearchPolicyRoute,
      PolicyDetailsRoute,
      AccountSettingsRoute,
      PendingIssuanceRoute,
      ExpiringPoliciesRoute,
      NonRenewalsRoute,
      RollOverSuspenseRoute,
      reportingAnalytics,
      reports,
      ClaimRoute,
      CustomerDetailsRoute,
      SearchClaimsRoute,
      ViewClaimsRoute,
      CommissionStatementsRoute,
      ExpiringreportsRoute,
      StartTransactionRoute,
      ManageViewedPolicyRoute,
      BillingRoute,
      PrivacyPolicyRoute,
      ContactUsRoute,
      TermsOfUseRoute,
      CreateFloodQuote,
      UploadFileOption,
      CreateHeraldProduct,
      CreateHeraldForm,
      CreateQuotePage,
      CreateQuoteDetails,
      AutomaticquoteRoute,
      AutoFillUpQuote,
      AlltransactionpaymentRoute,
      ProducerProductionRoute,
      PremiumtrustRoute,
      ProducerlossratioRoute,
      BulkQuoteRoute
    ],
    "agent_login": [
      DashboardRoute,
      SearchQuotedRoute,
      CommercialPropertyQuote,
      HomeOwnersQuote,
      EditQuote,
      SearchPolicyRoute,
      PolicyDetailsRoute,
      AccountSettingsRoute,
      UploadDocumentsRoute,
      PendingIssuanceRoute,
      ExpiringPoliciesRoute,
      NonRenewalsRoute,
      RollOverSuspenseRoute,
      reportingAnalytics,
      reports,
      ClaimRoute,
      CustomerDetailsRoute,
      SearchClaimsRoute,
      ViewClaimsRoute,
      CommissionStatementsRoute,
      ExpiringreportsRoute,
      StartTransactionRoute,
      ManageViewedPolicyRoute,
      BillingRoute,
      PrivacyPolicyRoute,
      ContactUsRoute,
      TermsOfUseRoute,
      CreateFloodQuote,
      UploadFileOption,
      CreateHeraldProduct,
      CreateHeraldForm,
      CreateQuotePage,
      CreateQuoteDetails,
      AutomaticquoteRoute,
      AutoFillUpQuote,
      AlltransactionpaymentRoute,
      ProducerProductionRoute,
      PremiumtrustRoute,
      ProducerlossratioRoute,
      BulkQuoteRoute
    ]
  }
  
  export default IRouteS
  