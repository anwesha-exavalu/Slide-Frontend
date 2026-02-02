import { Col, Row } from "antd";
import React from "react";
import { Container } from "styles/components/Layout";
import { TermsOfUseContainer, TermsOfUseContent } from "styles/pages/TermsOfUse";
import PrivacyImage from "assets/svg/privacybanner.svg";

const TermsOfUse = () => {
    return (
        <div>
            <TermsOfUseContainer>
                <Container>
                    <Row>
                        <Col span={12} className="privacy-card">
                            <h4 className="title">TERMS OF USE</h4>
                            <p className="subtext">
                                Effective Date:September 9, 2024
                                <br /><br />
                                Version 2.0
                            </p>
                        </Col>
                        <Col span={12}>
                            <div className="privacyimage">
                                <img src={PrivacyImage} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </TermsOfUseContainer>
            <TermsOfUseContent>
                <Container>
                    <h5 className="heading">TERMS OF USE</h5>
                    <p className="content">
                        THE INFORMATION FROM OR THROUGH THIS SITE IS PROVIDED &quot;AS-IS&quot;, &quot;AS AVAILABLE&quot;, 
                        AND ALL WARRANTIES, EXPRESS OR IMPLIED, ARE DISCLAIMED (INCLUDING BUT NOT LIMITED TO THE DISCLAIMER OF ANY IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE). THE INFORMATION MAY CONTAIN ERRORS, PROBLEMS OR OTHER LIMITATIONS. OUR SOLE AND ENTIRE MAXIMUM LIABILITY FOR ANY INACCURATE INFORMATION, FOR ANY REASON, AND USER&apos;S SOLE AND EXCLUSIVE REMEDY FOR ANY CAUSE WHATSOEVER, SHALL BE LIMITED TO THE AMOUNT PAID BY THE CUSTOMER FOR THE INFORMATION RECEIVED (IF ANY). WE ARE NOT LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES (INCLUDING DAMAGES FOR LOSS OF BUSINESS, LOSS OF PROFITS, LITIGATION, OR THE LIKE). WHETHER BASED ON BREACH OF CONTRACT, BREACH OF WARRANTY, TORT (INCLUDING NEGLIGENCE), PRODUCT LIABILITY OR OTHERWISE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. THE LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL ELEMENTS OF THE BASIS OF THE BARGAIN BETWEEN YOU AND US. WE WOULD NOT PROVIDE THIS SITE AND INFORMATION WITHOUT SUCH LIMITATIONS. NO REPRESENTATIONS, WARRANTIES OR GUARANTEES WHATSOEVER ARE MADE AS TO THE ACCURACY, ADEQUACY, RELIABILITY, CURRENTNESS, COMPLETENESS, SUITABILITY OR APPLICABILITY OF THE INFORMATION TO A PARTICULAR SITUATION.
                    </p>
                    <p> All responsibility and liability for any damages caused by viruses contained within the electronic files of this site are disclaimed.</p>

                    <p> All terms and conditions with respect to this site is governed by a Terms of Service Agreement </p>
                </Container>
            </TermsOfUseContent>
        </div>
    );
};

export default TermsOfUse;
