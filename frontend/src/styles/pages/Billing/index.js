import styled from "styled-components";

export const BillingCard = styled.div`
  .ant-card-body {
    box-shadow: 0px 6px 18px -2px #18181C1A;
    border-radius: 8px 8px;
  }
  .card-title {
    font-size: 24px;
    font-weight: 600;
    line-height: 22px;
    margin: 0px;
    letter-spacing: -0.03em;
    padding-top:20px;
    padding-bottom:20px;
 }  
.card-content {
    margin: 18px 0 0px;
    p {
      font-size: 13px;
      font-weight: 400;
      line-height: 19.5px;
      font-family:"Inter";
      name:Text xs/Regular;
    }
}
.card-icon {
  width:34px; 
  height:34px;
  background:#EEF6FF;
  border-radius:6px;
  align-content:center;
  text-align:center;
}

.icon {
  margin-bottom:2px;
}
.card-headings {
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin-top:20px;
}

.formFields-border {
  border-radius: 8px;
  border: 1px solid #F1F1F1;
  box-shadow: 0px 1.5px 4px -1px #0A090B12;
}
.ant-upload-wrapper .ant-upload-list .ant-upload-list-item-error .ant-upload-list-item-name ,
.ant-upload-icon .anticon {
  color: #1677ff;
}

.row {
  margin-top:30px;
}

.summary-row {
  background: #e6f7ff;
  font-family:Inter; 
  font-weight: 500; 
  font-size:12px;
  color:#054F7D;
  align-items:center;
  letter-spacing: -0.32px;
}
.summary-label {
 text-align: right;
 padding-right: 50px;
}  
`

export const TableContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  .ant-table {
    overflow: auto;
  }
  .ant-table-content table {
    tr:not(.summary-row) th {
      background-color: #f3f3f3;
      font-family: "Plus-Jakarta-Sans";
      font-size: 12px;
      font-weight: 600;
      line-height: 18px;
      color: #7f7d83;
    }
    tr:not(.summary-row) td {
      font-family: "Plus-Jakarta-Sans";
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: #0a090b;
    }
  }
  .ant-pagination-next {
    span {
      background-color: #e4f0ff;
      display: inline;
      padding: 10px 20px;
      border-radius: 8px;
      border-top: 1px solid #1169a0;
    }
    span::after {
      color: #1169a0;
      content: "Next";
      font-size: 14px;
      font-weight: 700;
      line-height: 18px;
      padding-right: 10px;
    }
    button {
      position: relative;
    }
    button:before {
      content: "";
      background-image: url('data:image/svg+xml,<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49954 0.5C11.3696 0.499087 14.5062 3.63898 14.4998 7.50799C14.4934 11.3734 11.3637 14.4995 7.50046 14.5C3.6322 14.5005 0.491074 11.356 0.499774 7.49155C0.508474 3.62345 3.63449 0.500914 7.49954 0.5ZM8.86681 8.12291C8.29765 8.69077 7.76741 9.21888 7.239 9.74836C6.97755 10.0101 6.96152 10.3386 7.19505 10.5666C7.42445 10.7904 7.74452 10.7721 8.00185 10.5163C8.4112 10.1097 8.81873 9.70085 9.22671 9.29334C9.66308 8.85706 10.1008 8.4226 10.5354 7.98448C10.7954 7.72225 10.7931 7.41937 10.5354 7.15348C10.4955 7.11237 10.4548 7.07262 10.4145 7.03196C9.6182 6.23614 8.82147 5.44169 8.02703 4.64449C7.89058 4.5079 7.73811 4.41927 7.54075 4.4412C7.32326 4.46541 7.16666 4.58008 7.08973 4.78566C7.00777 5.00449 7.05539 5.20276 7.21977 5.36813C7.72391 5.87386 8.22988 6.37822 8.73448 6.88303C8.77569 6.92415 8.81415 6.96755 8.8778 7.03516C8.77248 7.03516 8.71021 7.03516 8.64748 7.03516C7.39011 7.03516 6.1332 7.0347 4.87583 7.03516C4.56584 7.03516 4.34697 7.19277 4.28515 7.45409C4.2009 7.80997 4.46831 8.12154 4.86439 8.12245C6.12175 8.12428 7.37866 8.12291 8.63603 8.12291H8.86635H8.86681Z" fill="%23054F7D"/></svg>');
      width: 30px;
      height: 15px;
      display: block;
      position: absolute;
      background-repeat: no-repeat;
      background-size: contain;
      right: 0px;
      background-position: center;
      top: 8px;
    }
    svg {
      display: none;
    }
  }
  .ant-pagination-prev {
    button {
      position: relative;
    }
    button:before {
      content: "";
      background-image: url('data:image/svg+xml,<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49954 0.5C11.3696 0.499087 14.5062 3.63898 14.4998 7.50799C14.4934 11.3734 11.3637 14.4995 7.50046 14.5C3.6322 14.5005 0.491074 11.356 0.499774 7.49155C0.508474 3.62345 3.63449 0.500914 7.49954 0.5ZM8.86681 8.12291C8.29765 8.69077 7.76741 9.21888 7.239 9.74836C6.97755 10.0101 6.96152 10.3386 7.19505 10.5666C7.42445 10.7904 7.74452 10.7721 8.00185 10.5163C8.4112 10.1097 8.81873 9.70085 9.22671 9.29334C9.66308 8.85706 10.1008 8.4226 10.5354 7.98448C10.7954 7.72225 10.7931 7.41937 10.5354 7.15348C10.4955 7.11237 10.4548 7.07262 10.4145 7.03196C9.6182 6.23614 8.82147 5.44169 8.02703 4.64449C7.89058 4.5079 7.73811 4.41927 7.54075 4.4412C7.32326 4.46541 7.16666 4.58008 7.08973 4.78566C7.00777 5.00449 7.05539 5.20276 7.21977 5.36813C7.72391 5.87386 8.22988 6.37822 8.73448 6.88303C8.77569 6.92415 8.81415 6.96755 8.8778 7.03516C8.77248 7.03516 8.71021 7.03516 8.64748 7.03516C7.39011 7.03516 6.1332 7.0347 4.87583 7.03516C4.56584 7.03516 4.34697 7.19277 4.28515 7.45409C4.2009 7.80997 4.46831 8.12154 4.86439 8.12245C6.12175 8.12428 7.37866 8.12291 8.63603 8.12291H8.86635H8.86681Z" fill="%23054F7D"/></svg>');
      width: 30px;
      height: 15px;
      display: block;
      position: absolute;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      transform: rotate(180deg);
      top: 8px;
    }
    span {
      background-color: #e4f0ff;
      display: inline;
      padding: 10px 20px;
      border-top: 1px solid #1169a0;
      border-radius: 8px;
    }

    span:after {
      color: #1169a0;
      content: "Prev";
      font-size: 14px;
      padding-left: 10px;
      font-weight: 700;
      line-height: 18px;
    }
    svg {
      display: none;
    }
  }
  .ant-checkbox-group {
    padding-top: 25px;
  }
`;