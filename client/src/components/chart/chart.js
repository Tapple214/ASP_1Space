import { Col } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

export default function chartDisplay({ financialData }) {
  // Data for the chart
  const chartData = {
    labels: Object.keys(financialData).filter(
      (key) => key !== "income" && key !== "monthBudget"
    ),
    datasets: [
      {
        label: "Amount Spent",
        data: Object.values(financialData).filter(
          (_, index) => index !== 0 && index !== 1
        ), // Exclude 'income' and 'monthBudget'
        backgroundColor: "rgba(129, 29, 112, 0.5)",
        borderColor: "rgba(115, 11, 158, 0.7)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `$${tooltipItem.raw}`;
          },
        },
      },
    },
  };
  return (
    <>
      <Col md={12} lg={4} className="h-auto w-100 ">
        <div className="chart-container mt-4 text-center">
          <h3>Category Breakdown</h3>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </Col>
    </>
  );
}
