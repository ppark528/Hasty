import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { formatDateInput, formatDate, formatGaDate } from '../../utils/dateFormater';
import { getAnalyticsData } from '../../services/googleAnalyticsService';
import toastr from 'toastr';

const GASessionsOverview = (props) => {
    const colors = ['#0acf97'];

    const [gaResults, setGaResults] = useState({
        dimensions: [],
        metrics: [],
    });

    useEffect(() => {
        getSiteData(props.dateRange.startDate, props.dateRange.endDate);
    }, [props.dateRange.startDate, props.dateRange.endDate]);

    const getSiteData = (startDate, endDate) => {
        let payload = {
            startDate: formatDateInput(startDate),
            endDate: formatDateInput(endDate),
            metrics: [{ expression: 'ga:sessions', alias: 'sessions' }],
            dimensions: [{ name: 'ga:date' }],
        };
        getAnalyticsData(payload).then(onGetAnalyticsSuccess).catch(onGetError);
    };

    const onGetAnalyticsSuccess = (response) => {
        const rows = response.item.reports[0].data.rows;
        let days = rows.map((row) => {
            return formatGaDate(row.dimensions[0]);
        });

        let sessions = rows.map((row) => {
            return row.metrics[0].values[0];
        });

        setGaResults((prevState) => {
            let ns = { ...prevState };
            ns.dimensions = days;
            ns.metrics = sessions;
            return ns;
        });
    };

    const onGetError = () => {
        toastr.error('Unable to retrieve site analytics', 'Data not found');
    };

    const apexBarChartOpts = {
        grid: {
            padding: {
                left: 0,
                right: 0,
            },
        },
        chart: {
            height: 309,
            type: 'area',
            parentHeightOffset: 0,
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 4,
        },
        zoom: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        colors: colors,
        xaxis: {
            type: 'string',
            categories: gaResults.dimensions,
            tooltip: {
                enabled: false,
            },
            axisBorder: {
                show: false,
            },
            labels: {},
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val + ' viewer(s)';
                },
                offsetX: -15,
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                type: 'vertical',
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.1,
                stops: [45, 100],
            },
        },
    };

    const apexBarChartData = [
        {
            name: 'Site sessions based on date range',
            data: gaResults.metrics,
        },
    ];

    const rangeArray = ['today', 'weekly', 'biweekly', 'monthly', 'yearly'];

    const onLocalDateRangeBtnClicked = (range) => {
        let startDate;
        let endDate;

        switch (range) {
            case 'today':
                startDate = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
                endDate = new Date();
                break;
            case 'weekly':
                startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                endDate = new Date();
                break;
            case 'biweekly':
                startDate = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
                endDate = new Date();
                break;
            case 'monthly':
                startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                endDate = new Date();
                break;
            case 'yearly':
                startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
                endDate = new Date();
                break;
            default:
                startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                endDate = new Date();
                break;
        }
        startDate = formatDate(startDate);
        endDate = formatDate(endDate);
        props.onDateRangeChange(startDate, endDate);
    };

    const renderDateRange = () => {
        return rangeArray.map(mapDateRange);
    };

    const mapDateRange = (item, index) => {
        return (
            <li key={`${item.rangeArray}_${index}`} className="nav-item">
                <button type="button" className="btn btn-outline-dark" onClick={() => onLocalDateRangeBtnClicked(item)}>
                    {item}
                </button>
            </li>
        );
    };

    return (
        <Card className="card-h-100">
            <Card.Body>
                <ul className="nav float-end d-none d-lg-flex">{renderDateRange()}</ul>
                <h4 className="header-title mb-3">Sessions Overview</h4>

                <Chart
                    options={apexBarChartOpts}
                    series={apexBarChartData}
                    type="area"
                    className="apex-charts mt-3"
                    height={308}
                />
            </Card.Body>
        </Card>
    );
};

GASessionsOverview.propTypes = {
    data: PropTypes.shape({
        dimensions: PropTypes.arrayOf(PropTypes.string),
        metrics: PropTypes.arrayOf(PropTypes.string),
    }),
    onDateRangeChange: PropTypes.func,
    dateRange: PropTypes.shape({
        startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    }),
};

export default GASessionsOverview;
