import React, { useEffect, useState } from 'react';
import GASessionsOverview from './GASessionsOverview';
import GAGeoChart from './GAGeoChart';
import GAViewsChart from './GAViewsChart';
import GABrowsersChart from './GABrowsersChart';
import GAOsChart from './GAOsChart';
import DatePicker from 'react-datepicker';
import './gastyles.css';

function GoogleAnalytics() {
    const [mainDateRange, setMainDateRange] = useState({
        startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        endDate: new Date(),
    });
    const [tempDateRange, setTempDateRange] = useState({
        startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        endDate: new Date(),
    });
    const [sessionsChartDateRange, setSessionsChartDateRange] = useState({
        startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        endDate: new Date(),
    });

    const onDateChanged = (startDate, endDate) => {
        setSessionsChartDateRange((prevState) => {
            return { ...prevState, startDate: startDate, endDate: endDate };
        });
    };

    const onApplyBtnClicked = () => {
        setMainDateRange(tempDateRange);
    };

    const handleStartDateChange = (date) => {
        setTempDateRange((prevState) => {
            return { ...prevState, startDate: date };
        });
    };

    const handleEndDateChange = (date) => {
        setTempDateRange((prevState) => {
            return { ...prevState, endDate: date };
        });
    };

    return (
        <React.Fragment>
            <div className="ga-container">
                <h1 className="ga-title mt-3">Google Analytics Dashboard</h1>
                <div className="row">
                    <div className="col ga-top-chart">
                        <GASessionsOverview dateRange={sessionsChartDateRange} onDateRangeChange={onDateChanged} />
                    </div>
                </div>
                <hr className="hr" />
                <div className="row">
                    <p className="ga-apply-button mt-3">
                        Select <b>start</b> and <b>end date</b> for the analytics charts below
                    </p>
                    <div className="row">
                        <div className="ga-date-picker-container ga-datepicker">
                            <DatePicker
                                selected={tempDateRange.startDate}
                                onChange={handleStartDateChange}
                                selectsStart
                                startDate={tempDateRange.startDate}
                                endDate={tempDateRange.endDate}
                            />
                            <DatePicker
                                selected={tempDateRange.endDate}
                                onChange={handleEndDateChange}
                                selectsEnd
                                startDate={tempDateRange.startDate}
                                endDate={tempDateRange.endDate}
                                minDate={tempDateRange.startDate}
                            />
                        </div>
                        <div className="container-fluid">
                            <div className="mb-4 ga-apply-button">
                                <button className="btn btn-secondary mt-1 mb-2" onClick={onApplyBtnClicked}>
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="row ga-charts-container">
                            <div className="col-md-6">
                                <GAViewsChart range={mainDateRange} />
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <GABrowsersChart range={mainDateRange} />
                                    </div>
                                    <div className="col-md-6">
                                        <GAOsChart range={mainDateRange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <GAGeoChart range={mainDateRange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default GoogleAnalytics;
