import { Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Container } from "styles/components/Layout";
// import ShareIcon from "assets/svg/share.svg";
// import ViewIcon from "assets/svg/view.svg";
import QuickLionk from "assets/svg/quicklink.svg";
import QuickLinkDark from "assets/images/quicklink-dark.png";
import TargetDashboard from "assets/images/taget-dashboard.png";
import {
  DashboardCard,
  DashboardSection,
  BannerImage,
  GraphTitle,
} from "styles/pages/Dashboard";
import AreaChart from "components/Graphs/AreaChart";
import { jsonData } from "components/Graphs/AreaChart/areaChartDummyData";
import QuoteReprintModal from "components/PopupModal/QuoteReprintModal";
import useMetaData from "context/metaData";
import HorizontalChart from "components/Graphs/HorizontalChart";

import {
  carrierSeries,
  carrierCategories,
  quoteSeries,
  quoteCategories,
} from "components/Graphs/HorizontalChart/chartData";

const Dashboard = () => {
  const { theme } = useMetaData();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const converted = jsonData.data.map((item) => item.converted);
  const submitted = jsonData.data.map((item) => item.submitted);

  const handleReprintQuote = () => {
    setOpen(true);
  };

  const series = [
    {
      name: "Submitted",
      data: submitted,
    },
    {
      name: "Converted",
      data: converted,
    }
  ];

  return (
    <>
      <DashboardSection theme={theme}>
        <BannerImage theme={theme}>
          <Container>
            <Row>
              <Col span={16}>
                <p className="subtitle">Welcome</p>
                <h3 className="name">Hi, Michael Doe</h3>
                <p className="content">
                  Let’s make sure your clients are covered, and their journey is
                  smooth
                </p>
              </Col>
              <Col span={6} className="ta">
                <img src={TargetDashboard} />
              </Col>
            </Row>
          </Container>
        </BannerImage>
        <DashboardCard theme={theme}>
          <Container>
            <Row gutter={16} className="mt-negative">
              <Col className="gutter-row" span={9}>
                <Card>
                  <div>
                    {/* <div className="cardvalue-data">
                      <span className="viewicon">
                        <img src={ViewIcon} />
                      </span>
                      TOTAL<span className="card-value">15</span>
                    </div> */}
                    <div className="card-content">
                      <h5 className="card-title"> Coverage Insights</h5>
                      <div className="card-desc-datavalue">
                        <Row gutter={16}>
                          <Col span={6}>
                            <strong>Product</strong>
                          </Col>
                          <Col span={9}>
                            <strong>Better Conversion</strong>
                          </Col>
                          <Col span={6}>
                            <strong>Rated/Referred</strong>
                          </Col>
                        </Row>
                        <hr />
                        <Row gutter={16}>
                          <Col span={7}>Cyber</Col>
                          <Col span={8}>$50K - $1mn</Col>
                          <Col span={6}>47%</Col>
                        </Row>
                        <br />
                        <Row gutter={16}>
                          <Col span={6}>
                            <strong>Product</strong>
                          </Col>
                          <Col span={9}>
                            <strong>Least Conversion</strong>
                          </Col>
                          <Col span={6}>
                            <strong>Rejected/Abandoned</strong>
                          </Col>
                        </Row>
                        <hr />
                        <Row gutter={16}>
                          <Col span={7}>Excess Liability</Col>
                          <Col span={8}>$10mn - $50mn</Col>
                          <Col span={6}>37%</Col>
                        </Row>
                      </div>
                      {/* <p className="card-desc">
                        View list of policies that need review along with the
                        transaction details
                      </p>
                      <div
                        className="redirect-link"
                        onClick={() => navigate("/policy-transactions")}
                      >
                        <span>
                          <img src={ShareIcon} alt="Share" />
                        </span>
                      </div> */}
                    </div>
                  </div>
                </Card>
              </Col>
              <Col className="gutter-row" span={6}>
                <Card>
                  <div>
                    {/* <div className="cardvalue-data">
                      <span className="viewicon">
                        {" "}
                        <img src={ViewIcon} />
                      </span>
                      TOTAL<span className="card-value">18</span>
                    </div> */}
                    <div className="card-content">
                      <h5 className="card-title">Alerts and Reminders</h5>
                      <div className="card-desc-datavalue">
                        <Row gutter={16}>
                          <Col span={18}>Renewal Due</Col>
                          <Col span={6}>
                            <span
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                              onClick={() => navigate("/search-quote")}
                            >
                              17
                            </span>
                          </Col>
                        </Row>
                        <hr />
                        <Row gutter={16}>
                          <Col span={18}>Conversion Deadline</Col>
                          <Col span={6}>
                            <span
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                              onClick={() => navigate("/search-quote")}
                            >
                              22
                            </span>
                          </Col>
                        </Row>
                        <hr />
                        <Row gutter={16}>
                          <Col span={18}>Followups Due</Col>
                          <Col span={6}>
                            <span
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                              onClick={() => navigate("/search-quote")}
                            >
                              15
                            </span>
                          </Col>
                        </Row>
                        <hr />
                        <Row gutter={16}>
                          <Col span={18}>Approval Due</Col>
                          <Col span={6}>
                            <span
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                              onClick={() => navigate("/search-quote")}
                            >
                              10
                            </span>
                          </Col>
                        </Row>
                        <hr />
                        <Row gutter={16}>
                          <Col span={18}>New Requests</Col>
                          <Col span={6}>
                            {" "}
                            <span
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                              onClick={() => navigate("/search-quote")}
                            >
                              12
                            </span>
                          </Col>
                        </Row>
                      </div>
                      {/* <div
                        className="redirect-link"
                        onClick={() => navigate("/policies-in-force")}
                      >
                        <span>
                          <img src={ShareIcon} alt="Share" />
                        </span>
                      </div> */}
                    </div>
                  </div>
                </Card>
              </Col>
              <Col className="gutter-row" span={9}>
                <Card>
                  <div>
                    {/* <div className="cardvalue-data">
                      <span className="viewicon">
                        {" "}
                        <img src={ViewIcon} />
                      </span>
                      TOTAL<span className="card-value">12</span>
                    </div> */}
                    <div className="card-content">
                      <h5 className="card-title">Top Market Demand</h5>
                      <div className="card-desc-datavalue">
                        <Row gutter={16}>
                          <Col span={8}>
                            <strong>Annual Revenue</strong>
                          </Col>
                          <Col span={8}>
                            <strong>Line</strong>
                          </Col>
                          <Col span={6}>
                            <strong>Applied</strong>
                          </Col>
                        </Row>
                        <hr />
                        <Row gutter={16}>
                          <Col span={8}>$500K - $5 mn</Col>
                          <Col span={8}>Excess Liability</Col>
                          <Col span={6}>
                            30% <span style={{ color: "green" }}>(+3%)</span>
                          </Col>
                        </Row>
                        <br />
                        <Row gutter={16}>
                          <Col span={8}>$100K - $50 mn</Col>
                          <Col span={8}>Cyber</Col>
                          <Col span={5}>
                            27% <span style={{ color: "red" }}>(-5%)</span>
                          </Col>
                        </Row>
                        <br />
                        <Row gutter={16}>
                          <Col span={8}>$100K - $50mn</Col>
                          <Col span={8}>Personal Auto</Col>
                          <Col span={6}>
                            22% <span style={{ color: "red" }}>(-5%)</span>
                          </Col>
                        </Row>
                        <br />
                        <Row gutter={16}>
                          <Col span={8}>$5mn - $10mn</Col>
                          <Col span={8}>BoP</Col>
                          <Col span={6}>
                            25% <span style={{ color: "green" }}>(+3%)</span>{" "}
                          </Col>
                        </Row>
                      </div>
                      {/* <p className="card-desc">
                        View list of pending ESignature and its summary
                      </p>
                      <div
                        className="redirect-link"
                        onClick={() => navigate("/pending-esignature")}
                      >
                        <span>
                          <img src={ShareIcon} />
                        </span>
                      </div> */}
                    </div>
                  </div>
                </Card>
              </Col>
              {/* <Col className="gutter-row" span={6}>
                <Card>
                  <div>
                    <div className="cardvalue-data">
                      <span className="viewicon">
                        {" "}
                        <img src={ViewIcon} />
                      </span>
                      TOTAL<span className="card-value">10</span>
                    </div>
                    <div className="card-content">
                      <h5 className="card-title">Unpaid Cancels</h5>
                      <p className="card-desc">
                        View list of all future cancels if payment is not
                        received.
                      </p>
                      <div
                        className="redirect-link"
                        onClick={() => navigate("/unpaid-cancels")}
                      >
                        <span>
                          <img src={ShareIcon} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col> */}
            </Row>
          </Container>
        </DashboardCard>
        <Container className="mt-positive pb">
          <Row gutter={16} className="gp">
            <Col className="gutter-row" span={9}>
              <Card className="graph-card">
                <GraphTitle theme={theme}>Line Perfomance</GraphTitle>
                <div className="graph-card-strong">
                  <Row gutter={10}>
                    <Col span={6}>
                      <strong>Line</strong>
                    </Col>
                    <Col span={5}>
                      <strong>Quote</strong>
                    </Col>
                    <Col span={5}>
                      <strong>Referred</strong>
                    </Col>
                    <Col span={4}>
                      <strong>Carrier Follow Ups</strong>
                    </Col>
                    <Col span={4}>
                      <strong>Client Follow Ups</strong>
                    </Col>
                  </Row>
                  <hr />
                  <Row className="graph-card-datavalue" gutter={16}>
                    <Col span={6}>Cyber</Col>
                    <Col span={5}>75</Col>
                    <Col span={5}>15</Col>
                    <Col span={4}>5</Col>
                    <Col span={4}>7</Col>
                  </Row>
                  <br />
                  <Row className="graph-card-datavalue" gutter={16}>
                    <Col span={6}>BoP</Col>
                    <Col span={5}>32</Col>
                    <Col span={5}>5</Col>
                    <Col span={4}>2</Col>
                    <Col span={4}>1</Col>
                  </Row>
                  <br />
                  <Row className="graph-card-datavalue" gutter={16}>
                    <Col span={6}>D & O</Col>
                    <Col span={5}>15</Col>
                    <Col span={5}>5</Col>
                    <Col span={4}>0</Col>
                    <Col span={4}>3</Col>
                  </Row>
                  <br />
                  <Row className="graph-card-datavalue" gutter={16}>
                    <Col span={6}>Personal Auto</Col>
                    <Col span={5}>25</Col>
                    <Col span={5}>7</Col>
                    <Col span={4}>3</Col>
                    <Col span={4}>1</Col>
                  </Row>
                  <br />
                  <Row className="graph-card-datavalue" gutter={16}>
                    <Col span={6}>Personal Prop</Col>
                    <Col span={5}>20</Col>
                    <Col span={5}>12</Col>
                    <Col span={4}>5</Col>
                    <Col span={4}>5</Col>
                  </Row>
                  <br />
                  <Row className="graph-card-datavalue" gutter={16}>
                    <Col span={6}>Other</Col>
                    <Col span={5}>15</Col>
                    <Col span={5}>10</Col>
                    <Col span={4}>2</Col>
                    <Col span={4}>5</Col>
                  </Row>
                </div>
                {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/allpayment")}
                >
                  <span>
                    <img src={ShareIcon} />
                  </span>
                </div> */}
              
              </Card>
              <Card className="graph-card mt">
                <GraphTitle theme={theme}>Carrier Perfomance</GraphTitle>
                <HorizontalChart
                  series={carrierSeries}
                  categories={carrierCategories}
                />
                {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/producerproduction")}
                >
                  <span>
                    <img src={ShareIcon} />
                  </span>
                </div> */}
              </Card>
            </Col>
            <Col className="gutter-row" span={9}>
              <Card className="graph-card">
                <GraphTitle theme={theme}>Quote To Bind Ratio</GraphTitle>
                <AreaChart  theme={theme} data={jsonData.data} series={series} />
              </Card>
              <Card className="graph-card mt">
                <GraphTitle theme={theme}>Quote Status</GraphTitle>
                <HorizontalChart
                  theme={theme}
                  series={quoteSeries}
                  categories={quoteCategories}
                />
                {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/producerlossratio")}
                >
                  <span>
                    <img src={ShareIcon} />
                  </span>
                </div> */}
              </Card>
            </Col>
            <Col className="gutter-row gutter-row full-height-col" span={6}>
              <div className="col-content full-height">
                <Card className="quick-link">
                  <h4 className="quick-title">
                    {" "}
                    {theme === "dark" ? (
                      <img src={QuickLinkDark} />
                    ) : (
                      <img src={QuickLionk} />
                    )}
                    Quick links
                  </h4>
                  <div className="linkbox">
                    <a onClick={() => navigate("/uploadDocuments")}>
                      File Upload
                    </a>
                    <a onClick={() => navigate("/create-quote")}>
                      Create Quote
                    </a>
                    <a onClick={() => handleReprintQuote()}>Reprint Quote</a>
                    <QuoteReprintModal open={open} setOpen={setOpen} />
                    <a onClick={() => navigate("/claim")}>Create FNOL</a>
                    <a onClick={() => navigate("/viewed-policy")}>
                      Recently Viewed Policies
                    </a>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </DashboardSection>
    </>
  );
};

export default Dashboard;
