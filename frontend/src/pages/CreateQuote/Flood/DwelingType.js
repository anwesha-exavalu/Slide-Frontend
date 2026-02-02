import React, {useState, useEffect} from 'react'
import Effectivedate from 'assets/images/Effectivedate.svg';
import Buildinginfo from 'assets/images/Buildinginfo.svg';
import Buildingfond from 'assets/images/Buildingfond.svg';
import Garage from 'assets/images/Garage.svg';
import Contentwriter from 'assets/images/Contentwriter.svg';
import Insureddetails from 'assets/images/Insureddetails.svg';
import Floodzonefile from 'assets/images/Floodzonefile.svg';
import Dropdown from 'components/FormControl/DropdownSelect';
import FormDatePicker from 'components/FormControl/FormDatePicker';
import FormRadio from 'components/FormControl/FormRadio';
import { Container } from "styles/pages/CreateQuote";
import { FormSection } from "styles/pages/SearchQuote";
import { Col, Row } from "antd";
import FormControl from "components/FormControl/FormInput";
import {DwellingOptionsval,Policypercentage} from 'components/FormControl/radioOption'
import dwellingTypeDropDown from "assets/files/dwellingType.csv";
import Papa from "papaparse";
import { setDropdownVals } from 'utils/helper';


const filesData = {};
const Dwelingtype = ({theme}) => {

        const [dropDownOpts, setdropDownOpts] = useState([]);
        const commonConfig = { delimiter: "," };

        useEffect(() => {
          Papa.parse(dwellingTypeDropDown, {
            ...commonConfig,
            header: true,
            download: true,
            complete: (results) => {
              setDropdownVals(results, filesData);
              setdropDownOpts(filesData);
            },
          });
        }, []);

    return (

        <Container>
            <FormSection theme={theme}>
                <div className='container-box'>
                    <div className="step-content-box"> <img src={Effectivedate} alt="Exavalu" title="Exavalu" className='logobox' />
                        {/* <button type="submit" className="stepperbutton-edit">
                          Edit
                        </button> */}
                    </div>
                    <Row gutter={16}>
                        <Col span={10}>
                            <div className='Heading-label'>Effective Date Information</div>
                            <div className="subheading-label">This information will help the agent better understand your needs and objectives.</div>
                        </Col>
                        <Col span={14}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Dropdown
                                        theme={theme}
                                        label="Waiting Period"
                                        name="WaitingPeriod"
                                        options={dropDownOpts?.WaitingPeriod || []}
                                        required={true}
                                    />
                                </Col>
                                <Col span={12}>
                                    <FormDatePicker theme={theme} label="effective Date" name="effectiveDate" type="text" required={true} />
                                </Col>

                            </Row>
                        </Col>

                    </Row>
                    <hr />
                    <div>
                        <div className="step-content-box">
                            <img src={Insureddetails} alt="Exavalu" title="Exavalu" className='logobox' />
                            {/* <button type="submit" className="stepperbutton-edit">
                        Edit
                       </button> */}

                        </div>
                        <Row gutter={16}>
                            <Col span={10}>
                                <div className='Heading-label'>Property Information</div>
                                <div className="subheading-label">This information will help the agent better understand your needs and objectives.</div>
                            </Col>
                            <Col span={14}>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Dropdown
                                        theme={theme}
                                            label="Is the building a condominium"
                                            name="Isthebuildingacondominium"
                                            options={dropDownOpts?.BuildingCondominium || []}
                                            required={true}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <FormDatePicker theme={theme} label="ConstructionDate" name="ConstructionDate" type="text" required={true} />
                                    </Col>
                                    <Col span={12}>
                                        <Dropdown
                                        theme={theme}
                                            label="Construction Date Based on"
                                            name="ConstructionDateBasedon"
                                            options={dropDownOpts?.ConstructionDate || []}
                                            required={true}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Dropdown
                                        theme={theme}
                                            label="Select Policy Type"
                                            name="SelectPolicyType"
                                            options={dropDownOpts?.SelectPolicyType || []}
                                            required={true}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <FormDatePicker theme={theme} label="PolicyPurchaseDate" name="PolicyPurchaseDate" type="text" required={true} />
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={10}>
                                        <label className="form-heading customlabel">
                                            Is the Insured a Tenant?
                                        </label>
                                    </Col>
                                    <Col span={11}>
                                        <FormRadio name="IstheInsuredaTenantProperty" options={DwellingOptionsval} defaultValue="" />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <hr />
                        <div className="step-content-box"> <img src={Floodzonefile} alt="Exavalu" title="Exavalu" className='logobox' />
                            {/* <button type="submit" className="stepperbutton-edit">
                        Edit
                    </button> */}

                        </div>
                        <Row gutter={16}>
                            <Col span={10}>
                                <div className='Heading-label'>Disaster Assistance</div>
                                <div className="subheading-label">This information will help the agent better understand your needs and objectives.</div>
                            </Col>
                            <Col span={6}>
                                <label className="form-heading customlabel">
                                    Is the Insured a Tenant?
                                </label>
                            </Col>
                            <Col span={6}>
                                <FormRadio name="IstheInsuredaTenantDisaster" options={DwellingOptionsval} defaultValue="" />
                            </Col>
                        </Row>
                        <hr />
                        <div className="step-content-box"> <img src={Buildinginfo} alt="Exavalu" title="Exavalu" className='logobox' />
                            {/* <button type="submit" className="stepperbutton-edit">
                        Edit
                    </button> */}

                        </div>
                        <Row gutter={16}>
                            <Col span={10}>
                                <div className='Heading-label'>Building Information</div>
                                <div className="subheading-label">This information will help the agent better understand your needs and objectives.</div>
                            </Col>
                            <Col span={14}>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Dropdown
                                        theme={theme}
                                            label="Building Purpose"
                                            name="BuildingPurpose"
                                            options={dropDownOpts?.BuildingPurpose || []}
                                            required={true}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Dropdown
                                        theme={theme}
                                            label="Building Occupancy"
                                            name="BuildingOccupancy"
                                            options={dropDownOpts?.BuildingOccupancy || []}
                                            required={true}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Dropdown
                                        theme={theme}
                                            label="Building Usage"
                                            name="BuildingUsage"
                                            options={dropDownOpts?.BuildingUsage || []}
                                            required={true}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Dropdown
                                        theme={theme}
                                            label="Building partially or entirely over water"
                                            name="Buildingpartiallyorentirelyoverwater"
                                            options={dropDownOpts?.Buildingpartially || []}
                                            required={true}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Dropdown
                                        theme={theme}
                                            label="Include Coverage for Additions or Extensions"
                                            name="IncludeCoverageforAdditionsorExtensions"
                                            options={dropDownOpts?.CoverageforAdditionsorExtensions || []}
                                            required={true}
                                        />
                                    </Col>
                                    <Row>
                                        <Col span={12}> <label className='form-heading customlabel'>Building Under Construction</label></Col>
                                        <Col span={12}><FormRadio name="BuildingUnderConstruction" options={DwellingOptionsval} defaultValue="" /></Col>
                                        <Col span={12}><label className='form-heading customlabel'>Walled & Roof</label></Col>
                                        <Col span={12}><FormRadio name="Walled&Roof" options={DwellingOptionsval} defaultValue="" /></Col>
                                        <Col span={12}><label className='form-heading customlabel' >What percentage of the year following the policy effective date will the insured and/or the insureds spouse live in the building?</label></Col>
                                        <Col span={12}><FormRadio name="Percentagepolicyeffectivedate" options={Policypercentage} defaultValue="" /></Col>
                                        <Col span={12}><label className='form-heading customlabel'>Is Building Located on Leased Federal Property?</label></Col>
                                        <Col span={12}><FormRadio name="IsBuildingLocatedonLeasedFederalProperty" options={DwellingOptionsval} defaultValue="" /></Col>
                                    </Row>
                                </Row>
                            </Col>
                        </Row>
                        <hr />
                        <div className="step-content-box"> <img src={Buildingfond} alt="Exavalu" title="Exavalu" className='logobox' />
                            {/* <button type="submit" className="stepperbutton-edit">
                        Edit
                    </button> */}
                        </div>
                        <Row gutter={16}>
                            <Col span={10}>
                                <div className='Heading-label'>Building Foundation</div>
                                <div className="subheading-label">This information will help the agent better understand your needs and objectives.</div>
                            </Col>
                            <Col span={14}>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Dropdown
                                        theme={theme}
                                            label="Basement/Enclosure/Crawtspace"
                                            name="Basement/Enclosure/Crawtspace"
                                            options={dropDownOpts?.Basement || []}
                                            required={true}
                                        />
                                    </Col>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Dropdown
                                        theme={theme}
                                                label="Number of floors or building Type (Provide the number of floors in the entire building, including basement/enclosed area. If applicable)"
                                                name="NumberoffloorsorbuildingType"
                                                options={dropDownOpts?.BuildingType || []}
                                                required={true}
                                            />
                                        </Col>
                                    </Row>
                                </Row>
                            </Col>
                        </Row>
                        <hr />
                        <div className="step-content-box"> <img src={Garage} alt="Exavalu" title="Exavalu" className='logobox' />
                            {/* <button type="submit" className="stepperbutton-edit">
                        Edit
                    </button> */}
                        </div>
                        <Row gutter={16}>
                            <Col span={10}>
                                <div className='Heading-label'>Garage Information</div>
                                <div className="subheading-label">This information will help the agent better understand your needs and objectives.</div>
                            </Col>
                            <Col span={14}>
                                <Row gutter={16}>
                                    <Col span={12}> <label className='form-heading customlabel'>Garage attached to or part of the building</label></Col>
                                    <Col span={12}><FormRadio name="garagepartbuilding" options={DwellingOptionsval} defaultValue="" /></Col>
                                    <Col span={12}>
                                        <FormControl
                                        theme={theme}
                                            label="Garage Square Foot Area"
                                            className="form-controls"
                                            name="GarageSquareFootArea"
                                            type="text"
                                            required={true}
                                        />
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                <Col span={12}>
                                            <FormControl
                                        theme={theme}
                                                label="Number of permanent flood openining in attached garage wall with in 1.0 above adjacent garage"
                                                className="form-controls"
                                                name="Numberofpermanentflood"
                                                type="text"
                                                required={true}
                                            />
                                        </Col>
                                </Row>
                            </Col>
                        </Row>
                        <hr />
                        <div className="step-content-box"> <img src={Contentwriter} alt="Exavalu" title="Exavalu" className='logobox' />
                            {/* <button type="submit" className="stepperbutton-edit">
                        Edit
                    </button> */}
                        </div>
                        <Row gutter={16}>
                            <Col span={10}>
                                <div className='Heading-label'>Contents Information</div>
                                <div className='subheading-label'>This information will help the agent better understand your needs and objectives.</div>
                            </Col>
                            <Col span={14}>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Dropdown
                                        theme={theme}
                                            label="Contents Location"
                                            name="ContentsLocation"
                                            options={dropDownOpts?.ContentsLocation || []}
                                            required={true}
                                        />
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={12}> <label className='form-heading customlabel'>Contents Only</label></Col>
                                    <Col span={12}><FormRadio  name="contentonly" options={DwellingOptionsval} defaultValue="" /></Col>

                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </FormSection>
        </Container>
    )
}

export default Dwelingtype
