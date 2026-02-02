import React from 'react';
import policySummaryIcon from "assets/svg/policy-summary.svg";
import propertyIcon from "assets/svg/property.svg";
import uwQuestionIcon from "assets/svg/uw-question.svg";
import coverageIcon from "assets/svg/coverage.svg";
import formsIcon from "assets/svg/forms.svg";
import paymentsIcon from "assets/svg/payments.svg";
import policySummaryBlueIcon from "assets/svg/policy-summary_blue.svg";
import propertyBlueIcon from "assets/svg/property_blue.svg";
import uwQuestionBlueIcon from "assets/svg/uw-question_blue.svg";
import coverageBlueIcon from "assets/svg/coverage_blue.svg";
import formsBlueIcon from "assets/svg/forms_blue.svg";
import paymentsBlueIcon from "assets/svg/payments_blue.svg";
import PolicySummary from './PolicySummary';
import Vehicles from './VehiclesData';
import Coverages from './Coverages';
import Drivers from './Drivers';
import Payment from './Payment';
import FormsTable from './FormsTable';
import Quetionaire from './Quetionaire';
import {
    PolicyDashboardFeatureCard,
} from "styles/pages/PolicyDetails";
import AdditionalInfo from './AdditionalInfo';
import LossHistory from './LossHistory';
import useMetaData from "context/metaData";



const PolicyTabsConfig = (tabToggles,isEditable) => {
    const {theme}=useMetaData();
    const defaultTabImages = {
        "1": policySummaryIcon,
        "2": propertyIcon,
        "3": uwQuestionIcon,
        "4": coverageIcon,
        "5": coverageIcon,
        "6": coverageIcon,
        "7": coverageIcon,
        "8": formsIcon,
        "9": paymentsIcon,
    };

    const tabNewImages = {
        "1": policySummaryBlueIcon,
        "2": propertyBlueIcon,
        "3": uwQuestionBlueIcon,
        "4": coverageBlueIcon,
        "5": coverageBlueIcon,
        "6": coverageBlueIcon,
        "7": coverageBlueIcon,
        "8": formsBlueIcon,
        "9": paymentsBlueIcon,
    };

    const tabItems = [
        {
            key: "1",
            label: (
                <PolicyDashboardFeatureCard theme={theme}>
                    <div className="ant-card-body">
                        <div className="card-icon">
                            <img
                                src={
                                    tabToggles["1"] ? tabNewImages["1"] : defaultTabImages["1"]
                                }
                                alt="Policy Summary"
                                className="svg-icon"
                            />
                        </div>
                        <div className="card-text">Policy Summary</div>
                    </div>
                </PolicyDashboardFeatureCard>
            ),
            content: (<PolicySummary isEditable={isEditable} />),
        },
        {
            key: "2",
            label: (
                <PolicyDashboardFeatureCard theme={theme}>
                    <div className="ant-card-body">
                        <div className="card-icon">
                            <img
                                src={
                                    tabToggles["2"] ? tabNewImages["2"] : defaultTabImages["2"]
                                }
                                alt="Vehicles"
                                className="svg-icon"
                            />
                        </div>
                        <div className="card-text">Vehicles</div>
                    </div>
                </PolicyDashboardFeatureCard>
            ),
            content: (<Vehicles isEditable={isEditable} />),
        },
        {
            key: "3",
            label: (
                <PolicyDashboardFeatureCard theme={theme}>
                    <div className="ant-card-body">
                        <div className="card-icon">
                            <img
                                src={
                                    tabToggles["3"] ? tabNewImages["3"] : defaultTabImages["3"]
                                }
                                alt="Drivers"
                                className="svg-icon"
                            />
                        </div>
                        <div className="card-text">Drivers</div>
                    </div>
                </PolicyDashboardFeatureCard>
            ),
            content: (<Drivers isEditable={isEditable} />),
        },
        {
            key: "4",
            label: (
                <PolicyDashboardFeatureCard theme={theme}>
                    <div className="ant-card-body">
                        <div className="card-icon">
                            <img
                                src={
                                    tabToggles["4"] ? tabNewImages["4"] : defaultTabImages["4"]
                                }
                                alt="Dwelling"
                                className="svg-icon"
                            />
                        </div>
                        <div className="card-text">Coverages</div>
                    </div>
                </PolicyDashboardFeatureCard>
            ),
            content: (<Coverages isEditable={isEditable} />),
        },
        {
            key: "5",
            label: (
                <PolicyDashboardFeatureCard theme={theme}>
                    <div className="ant-card-body">
                        <div className="card-icon">
                            <img
                                src={
                                    tabToggles["5"] ? tabNewImages["5"] : defaultTabImages["5"]
                                }
                                alt="Coverage"
                                className="svg-icon"
                            />
                        </div>
                        <div className="card-text">Questionnaire</div>
                    </div>
                </PolicyDashboardFeatureCard>
            ),
            content: (<Quetionaire isEditable={isEditable} />),
        },
        {
            key: "6",
            label: (
                <PolicyDashboardFeatureCard theme={theme}>
                    <div className="ant-card-body">
                        <div className="card-icon">
                            <img
                                src={
                                    tabToggles["6"] ? tabNewImages["6"] : defaultTabImages["6"]
                                }
                                alt="Coverage"
                                className="svg-icon"
                            />
                        </div>
                        <div className="card-text">AI</div>
                    </div>
                </PolicyDashboardFeatureCard>
            ),
            content: (<AdditionalInfo isEditable={isEditable} />),
        },
        {
            key: "7",
            label: (
                <PolicyDashboardFeatureCard theme={theme}>
                    <div className="ant-card-body">
                        <div className="card-icon">
                            <img
                                src={
                                    tabToggles["7"] ? tabNewImages["7"] : defaultTabImages["7"]
                                }
                                alt="Coverage"
                                className="svg-icon"
                            />
                        </div>
                        <div className="card-text">Loss History</div>
                    </div>
                </PolicyDashboardFeatureCard>
            ),
            content: (<LossHistory isEditable={isEditable} />),
        },
        {
            key: "8",
            label: (
                <PolicyDashboardFeatureCard theme={theme}>
                    <div className="ant-card-body">
                        <div className="card-icon">
                            <img
                                src={
                                    tabToggles["8"] ? tabNewImages["8"] : defaultTabImages["8"]
                                }
                                alt="Forms"
                                className="svg-icon"
                            />
                        </div>
                        <div className="card-text">Forms</div>
                    </div>
                </PolicyDashboardFeatureCard>
            ),
            content: (<FormsTable />),
        },
        {
            key: "9",
            label: (
                <PolicyDashboardFeatureCard theme={theme}>
                    <div className="ant-card-body">
                        <div className="card-icon">
                            <img
                                src={
                                    tabToggles["9"] ? tabNewImages["9"] : defaultTabImages["9"]
                                }
                                alt="Payment"
                                className="svg-icon"
                            />
                        </div>
                        <div className="card-text">Payment</div>
                    </div>
                </PolicyDashboardFeatureCard>
            ),
            content: (<Payment isEditable={isEditable} />),
        },
    ];

    return { defaultTabImages, tabNewImages, tabItems }
}
export default PolicyTabsConfig;