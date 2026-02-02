export const mockApplicationData = {
    application: {
        risk_values: [
            {
                "risk_parameter_id": "rsk_m4p9_insured_name",
                "value": "ARPAN SAHA",
                "parameter_text": {
                    "applicant_facing_text": "Business name",
                    "agent_facing_text": "Business name"
                },
                "input_type": "short_text"
            },
            {
                "risk_parameter_id": "rsk_voe4_cyb_security_officer",
                "value": "",
                "parameter_text": {
                    "applicant_facing_text": "Do you agree to be the designated Information Security Contact?",
                    "agent_facing_text": "Does the applicant agree to be the designated Information Security Contact?"
                },
                "input_type": "select_one"
            },
            {
                "risk_parameter_id": "rsk_t79b_insured_contact_name",
                "value": "Testing Value",
                "parameter_text": {
                    "applicant_facing_text": "Contact name",
                    "agent_facing_text": "Applicant's contact name"
                },
                "input_type": "short_text"
            },
            {
                "risk_parameter_id": "rsk_5p6w_insured_contact_email",
                "value": "test@test.com",
                "parameter_text": {
                    "applicant_facing_text": "Email address",
                    "agent_facing_text": "Applicant's email address"
                },
                "input_type": "email"
            },
            {
                "risk_parameter_id": "rsk_14kt_insured_contact_phone",
                "value": "1234567890",
                "parameter_text": {
                    "applicant_facing_text": "Phone number",
                    "agent_facing_text": "Applicant's phone number"
                },
                "input_type": "phone"
            },
            {
                "risk_parameter_id": "rsk_tvm3_mailing_address",
                "value": {
                    "city": "San Jose",
                    "line1": "6166 Cottle Rd",
                    "state": "CA",
                    "postal_code": "95123",
                    "country_code": "United States",
                    "organization": ""
                },
                "parameter_text": {
                    "applicant_facing_text": "Mailing address",
                    "agent_facing_text": "Applicant's mailing address"
                },
                "input_type": "address"
            },
            {
                "risk_parameter_id": "rsk_b3jm_2017_naics_index",
                "value": "",
                "parameter_text": {
                    "applicant_facing_text": "Industry classification",
                    "agent_facing_text": "Industry classification"
                },
                "input_type": "short_text"
            },
            {
                "risk_parameter_id": "rsk_k39d_number_of_employees",
                "value": "234",
                "parameter_text": {
                    "applicant_facing_text": "Number of employees",
                    "agent_facing_text": "Number of employees"
                },
                "input_type": "integer"
            },
            {
                "risk_parameter_id": "rsk_vrb1_total_annual_revenue",
                "value": "100000",
                "parameter_text": {
                    "applicant_facing_text": "Total annual revenue",
                    "agent_facing_text": "Total annual revenue"
                },
                "input_type": "currency"
            },
            {
                "risk_parameter_id": "rsk_4b4x_years_of_operation",
                "value": "",
                "parameter_text": {
                    "applicant_facing_text": "Years of operation",
                    "agent_facing_text": "Years of operation"
                },
                "input_type": "integer"
            },
            {
                "risk_parameter_id": "rsk_6onk_entity_type",
                "value": "",
                "parameter_text": {
                    "applicant_facing_text": "Which entity type best applies to your business?",
                    "agent_facing_text": "Which entity type best applies to the applicant?"
                },
                "input_type": "select_one"
            },
            {
                "risk_parameter_id": "rsk_7ahp_has_domain",
                "value": "",
                "parameter_text": {
                    "applicant_facing_text": "Do you have a company website or domain?",
                    "agent_facing_text": "Does the applicant have a company website or domain?"
                },
                "input_type": "select_one"
            },
            {
                "risk_parameter_id": "rsk_dy7r_domain_names",
                "value": "",
                "parameter_text": {
                    "applicant_facing_text": "Domain name",
                    "agent_facing_text": "Applicant's domain name"
                },
                "input_type": "domain"
            },
            {
                "risk_parameter_id": "rsk_2i59_ownership_type",
                "value": "",
                "parameter_text": {
                    "applicant_facing_text": "Which ownership type best applies to your business?",
                    "agent_facing_text": "Which ownership type best applies to the applicant?"
                },
                "input_type": "select_one"
            },
            {
                "risk_parameter_id": "rsk_e73e_cyb_authenticating_fund_transfers",
                "value": "",
                "parameter_text": {
                    "applicant_facing_text": "Do you prevent unauthorized employees from initiating wire transfers?",
                    "agent_facing_text": "Does the applicant prevent unauthorized employees from initiating wire transfers?"
                },
                "input_type": "select_one"
            },
            {
                "risk_parameter_id": "rsk_tw5r_dual_authentication",
                "value": "",
                "parameter_text": {
                    "applicant_facing_text": "When do you require a secondary means of communication to validate the authenticity of funds transfers (ACH, wire, etc.) requests before processing a request?",
                    "agent_facing_text": "When does the applicant require a secondary means of communication to validate the authenticity of funds transfers (ACH, wire, etc.) requests before processing a request?"
                },
                "input_type": "select_one"
            },
            {
                "risk_parameter_id": "rsk_zk4f_cyb_verifies_bank_accounts",
                "value": "",
                "parameter_text": {
                    "applicant_facing_text": "Do you verify vendor/supplier bank accounts before adding to accounts payable systems?",
                    "agent_facing_text": "Does the applicant verify vendor/supplier bank accounts before adding to accounts payable systems?"
                },
                "input_type": "select_one"
            },
            {
                "risk_parameter_id": "rsk_64p7_data_encryption",
                "value": [
                    ""
                ],
                "parameter_text": {
                    "applicant_facing_text": "Which of the following actions do you take to protect sensitive data?",
                    "agent_facing_text": "Which of the following actions does the applicant take to protect sensitive data?"
                },
                "input_type": "select_many"
            },
            {
                "risk_parameter_id": "rsk_5m1o_cyb_cloud_storage",
                "value": "",
                "parameter_text": {
                    "applicant_facing_text": "Do you have sensitive information stored on the cloud?",
                    "agent_facing_text": "Does the applicant have sensitive information stored on the cloud?"
                },
                "input_type": "select_one"
            },
            {
                "risk_parameter_id": "rsk_6ril_cyb_security_training",
                "value": "True",
                "parameter_text": {
                    "applicant_facing_text": "Do you provide mandatory information security training to all employees at least annually? If not, are you willing to implement it during the policy period?",
                    "agent_facing_text": "Does the applicant provide mandatory information security training to all employees at least annually?"
                },
                "input_type": "select_one"
            },
            {
                "risk_parameter_id": "rsk_s9i6_is_franchise",
                "value": "",
                "parameter_text": {
                    "applicant_facing_text": "Is your business part of a franchise?",
                    "agent_facing_text": "Is the applicant part of a franchise?"
                },
                "input_type": "select_one"
            },
            {
                "risk_parameter_id": "rsk_jb26_cyb_has_claims_history",
                "value": "",
                "parameter_text": {
                    "applicant_facing_text": "Have you ever experienced any incidents, situations, allegations, or losses that have resulted in or could reasonably give rise to a claim, loss, or any legal or regulatory actions against you that would fall within the scope of a cyber insurance policy for which you are applying?",
                    "agent_facing_text": "Has the applicant ever experienced any incidents, situations, allegations, or losses that have resulted in or could reasonably give rise to a claim, loss, or any legal or regulatory actions against them that would fall within the scope of a cyber insurance policy for which the applicant is applying?"
                },
                "input_type": "select_one"
            }
        ],
      coverage_values: [
        {
            "coverage_parameter_id": "cvg_o3mw_cyb_effective_date",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Cyber Effective Date",
                "agent_facing_text": "Cyber Effective Date"
            },
            "input_type": "date"
        },
        {
            "coverage_parameter_id": "cvg_agj9_cyb_aggregate_limit",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Aggregate Limit",
                "agent_facing_text": "Aggregate Limit"
            },
            "input_type": "select_one"
        },
        {
            "coverage_parameter_id": "cvg_64oi_cyb_business_income_coverage_limit",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Business Income Coverage Limit",
                "agent_facing_text": "Business Income Coverage Limit"
            },
            "input_type": "select_one"
        },
        {
            "coverage_parameter_id": "cvg_mov6_cyb_social_engineering_limit",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Social Engineering Limit",
                "agent_facing_text": "Social Engineering Limit"
            },
            "input_type": "select_one"
        },
        {
            "coverage_parameter_id": "cvg_7fsk_cyb_aggregate_retention",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Per Claim Retention",
                "agent_facing_text": "Per Claim Retention"
            },
            "input_type": "select_one"
        },
        {
            "coverage_parameter_id": "cvg_orn9_cyb_waiting_period",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Waiting Period (hours)",
                "agent_facing_text": "Waiting Period (hours)"
            },
            "input_type": "select_one"
        },
        {
            "coverage_parameter_id": "cvg_4sh1_cyb_social_engineering_deductible",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Social Engineering Deductible",
                "agent_facing_text": "Social Engineering Deductible"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_qd4i_cyb_retroactive_date",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Cyber Risk Retroactive Date",
                "agent_facing_text": "Cyber Risk Retroactive Date"
            },
            "input_type": "date"
        },
        {
            "coverage_parameter_id": "cvg_lw22_cyb_computer_fraud_endorsement",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Computer Fraud Endorsement",
                "agent_facing_text": "Computer Fraud Endorsement"
            },
            "input_type": "select_one"
        },
        {
            "coverage_parameter_id": "cvg_4k4p_cyb_contingent_business_interruption_limit",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Contingent Business Interruption Limit",
                "agent_facing_text": "Contingent Business Interruption Limit"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_0n9t_cyb_contingent_business_interruption_retention",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Contingent Business Interruption Retention",
                "agent_facing_text": "Contingent Business Interruption Retention"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_4b9r_cyb_data_breach_costs_outside_the_limit",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Data Breach Costs Outside the Limit",
                "agent_facing_text": "Data Breach Costs Outside the Limit"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_9b1z_cyb_data_breach_costs_outside_the_limit_retention",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Data Breach Costs Outside the Limit Retention",
                "agent_facing_text": "Data Breach Costs Outside the Limit Retention"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_6v9d_cyb_data_breach_liability_limit",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Data Breach Liability Limit",
                "agent_facing_text": "Data Breach Liability Limit"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_2r2c_cyb_data_breach_liability_retention",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Data Breach Liability Retention",
                "agent_facing_text": "Data Breach Liability Retention"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_5i3b_cyb_data_breach_response_limit",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Data Breach Response Limit",
                "agent_facing_text": "Data Breach Response Limit"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_9h0b_cyb_data_breach_response_retention",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Data Breach Response Retention",
                "agent_facing_text": "Data Breach Response Retention"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_4s9v_cyb_digital_asset_restoration_limit",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Digital Asset Restoration Limit",
                "agent_facing_text": "Digital Asset Restoration Limit"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_8d3e_cyb_digital_asset_restoration_retention",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Digital Asset Restoration Retention",
                "agent_facing_text": "Digital Asset Restoration Retention"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_1o1y_cyb_direct_business_interruption_limit",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Direct Business Interruption Limit",
                "agent_facing_text": "Direct Business Interruption Limit"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_4z0r_cyb_direct_business_interruption_retention",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Direct Business Interruption Retention",
                "agent_facing_text": "Direct Business Interruption Retention"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_5i1o_cyb_extortion_payment_limit",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Extortion Payment Limit",
                "agent_facing_text": "Extortion Payment Limit"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_9a1u_cyb_extortion_payment_retention",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Extortion Payment Retention",
                "agent_facing_text": "Extortion Payment Retention"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_1k7l_cyb_extortion_threat_limit",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Extortion Threat Limit",
                "agent_facing_text": "Extortion Threat Limit"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_7j6m_cyb_extortion_threat_retention",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Extortion Threat Retention",
                "agent_facing_text": "Extortion Threat Retention"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_6q3q_cyb_funds_transfer_fraud_limit",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Funds Transfer Fraud Limit",
                "agent_facing_text": "Funds Transfer Fraud Limit"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_1c6m_cyb_funds_transfer_fraud_retention",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Funds Transfer Fraud Retention",
                "agent_facing_text": "Funds Transfer Fraud Retention"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_4r0s_cyb_hardware_replacement_limit",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Hardware Replacement Limit",
                "agent_facing_text": "Hardware Replacement Limit"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_0n3d_cyb_hardware_replacement_retention",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Hardware Replacement Retention",
                "agent_facing_text": "Hardware Replacement Retention"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_2a9h_cyb_media_liability_limit",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Media Liability Limit",
                "agent_facing_text": "Media Liability Limit"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_9p3v_cyb_media_liability_retention",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Media Liability Retention",
                "agent_facing_text": "Media Liability Retention"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_0g1r_cyb_network_security_liability_limit",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Network Security Liability Costs Limit",
                "agent_facing_text": "Network Security Liability Costs Limit"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_7v7c_cyb_network_security_liability_retention",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Network Security Liability Costs Retention",
                "agent_facing_text": "Network Security Liability Costs Retention"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_6v2q_cyb_network_security_response_limit",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Network Security Response Limit",
                "agent_facing_text": "Network Security Response Limit"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_7j9k_cyb_network_security_response_retention",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Network Security Response Retention",
                "agent_facing_text": "Network Security Response Retention"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_6m9r_cyb_pci_dss_liability_limit",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "PCI-DSS Liability Limit",
                "agent_facing_text": "PCI-DSS Liability Limit"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_4w2t_cyb_pci_dss_liability_retention",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "PCI-DSS Liability Retention",
                "agent_facing_text": "PCI-DSS Liability Retention"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_3i8m_cyb_reputational_harm_limit",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Reputational Harm Limit",
                "agent_facing_text": "Reputational Harm Limit"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_8x8i_cyb_reputational_harm_retention",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Reputational Harm Retention",
                "agent_facing_text": "Reputational Harm Retention"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_0aka_cyb_amendatory_endorsement_included",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Amendatory Endorsement Coverage",
                "agent_facing_text": "Amendatory Endorsement Coverage"
            },
            "input_type": "select_one"
        },
        {
            "coverage_parameter_id": "cvg_2u6v_cyb_ransomware_event_limit",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Ransomware Event Limit",
                "agent_facing_text": "Ransomware Event Limit"
            },
            "input_type": "currency"
        },
        {
            "coverage_parameter_id": "cvg_9ep4_cyb_ransomware_event_retention",
            "value": "",
            "parameter_text": {
                "applicant_facing_text": "Ransomware Event Retention",
                "agent_facing_text": "Ransomware Event Retention"
            },
            "input_type": "currency"
        }
    ],
    }
  };