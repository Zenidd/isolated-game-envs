import './pricing.css'

export default function Pricing() {
  const pricingData = [
    { serverType: 'Basic', pricePerMinute: 0.01, pricePerMonth: 20, pricePerYear: 220 },
    { serverType: 'Standard', pricePerMinute: 0.02, pricePerMonth: 30, pricePerYear: 330 },
    { serverType: 'Premium', pricePerMinute: 0.03, pricePerMonth: 50, pricePerYear: 550 }
  ];
  

  return (
    <div style={{ margin: '20px' }}>
      <h1>Game Servers Pricing</h1>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
        border: '1px solid black'
      }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', border: '1px solid black' }}>Server Type</th>
            <th style={{ padding: '10px', border: '1px solid black' }}>Price/Minute ($)</th>
            <th style={{ padding: '10px', border: '1px solid black' }}>Price/Month ($)</th>
            <th style={{ padding: '10px', border: '1px solid black' }}>Price/Year ($)</th>
          </tr>
        </thead>
        <tbody>
          {pricingData.map((row, index) => (
            <tr key={index}>
              <td style={{ padding: '10px', border: '1px solid black' }}>{row.serverType}</td>
              <td style={{ padding: '10px', border: '1px solid black' }}>{row.pricePerMinute}</td>
              <td style={{ padding: '10px', border: '1px solid black' }}>{row.pricePerMonth}</td>
              <td style={{ padding: '10px', border: '1px solid black' }}>{row.pricePerYear}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}