---
toc: false
theme: [air, deep-space, wide]
---

# Consumer Shopping Trends Dashboard

## Retail Analytics & Customer Behavior Study

```js
import {DonutChart} from "./components/donutChart.js";
import {bigNumber} from "./components/bigNumber.js";

const shoppingData = FileAttachment("data/shopping_trends.csv").csv({typed: true});
```

```js
// Multi-select input for categories
const pickCategoryInput = Inputs.checkbox(
  ["All"].concat([...new Set(shoppingData.map(d => d.Category))].filter(d => d)),
  {
    label: "Product Categories:",
    value: ["All"],
    unique: false
  }
);
const pickCategory = Generators.input(pickCategoryInput);

// Age group selector
const ageGroupInput = Inputs.radio(
  ["All", "Gen Z (18-25)", "Millennials (26-40)", "Gen X (41-55)", "Boomers (56+)"],
  {
    label: "Age Group:",
    value: "All",
    unique: true
  }
);
const ageGroup = Generators.input(ageGroupInput);
```

<div class="grid grid-cols-2">
  <div>${pickCategoryInput}</div>
  <div>${ageGroupInput}</div>
</div>

## ${pickCategory.includes("All") ? "All Categories" : pickCategory.join(", ")} Analysis - ${ageGroup}

```js
// Color schemes
const categoryColors = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
  "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9"
];

const seasonColors = ["#FF9F43", "#10AC84", "#EE5A24", "#0FB9B1"];
const genderColors = ["#FF6B6B", "#4ECDC4", "#96CEB4"];
const paymentColors = ["#6C5CE7", "#A29BFE", "#FD79A8", "#FDCB6E", "#6C5CE7"];

// Location color scheme
const locationColors = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
  "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9",
  "#FF7675", "#74B9FF", "#00CEC9", "#55A3FF", "#FD79A8"
];
```

<div class="grid grid-cols-4">
  <div class="card">
    ${resize((width) => bigNumber(`Total Revenue`, getYearRange(), `$${d3.format(",.0f")(d3.sum(filteredData, d => d["Purchase Amount (USD)"]))}`, `${filteredData.length} transactions`, width))}
  </div>
  <div class="card">
    ${resize((width) => bigNumber(`Average Order Value`, getYearRange(), `$${d3.mean(filteredData, d => d["Purchase Amount (USD)"]).toFixed(2)}`, `${getAOVTrend()}`, width))}
  </div>
  <div class="card">
    ${resize((width) => bigNumber(`Total Customers`, getYearRange(), `${d3.format(",")(new Set(filteredData.map(d => d["Customer ID"])).size)}`, `${getCustomerGrowth()}`, width))}
  </div>
  <div class="card">
    ${resize((width) => bigNumber(`Avg Review Rating`, getYearRange(), `${d3.mean(filteredData, d => d["Review Rating"]).toFixed(1)} ⭐`, `${getRatingTrend()}`, width))}
  </div>
  <div class="card">
    ${resize((width) => bigNumber(`Subscription Rate`, getYearRange(), `${(d3.sum(filteredData, d => d["Subscription Status"] === "Yes" ? 1 : 0) / filteredData.length * 100).toFixed(1)}%`, `${getSubscriptionTrend()}`, width))}
  </div>
</div>

<div class="grid grid-cols-4">
  <div class="card">
    ${resize(width => DonutChart(categoryBreakdown, {
      centerText: "Categories", 
      width, 
      colorDomain: categoryBreakdown.map(d => d.name), 
      colorRange: categoryColors.slice(0, categoryBreakdown.length)
    }))}
  </div>
  <div class="card">
    ${resize(width => DonutChart(seasonBreakdown, {
      centerText: "Seasons", 
      width, 
      colorDomain: ["Spring", "Summer", "Fall", "Winter"], 
      colorRange: seasonColors
    }))}
  </div>
  <div class="card">
    ${resize(width => DonutChart(genderBreakdown, {
      centerText: "Gender", 
      width, 
      colorDomain: genderBreakdown.map(d => d.name), 
      colorRange: genderColors.slice(0, genderBreakdown.length)
    }))}
  </div>
  <div class="card">
    ${resize(width => DonutChart(paymentBreakdown, {
      centerText: "Payment", 
      width, 
      colorDomain: paymentBreakdown.map(d => d.name), 
      colorRange: paymentColors.slice(0, paymentBreakdown.length)
    }))}
  </div>
</div>

<div class="grid card" style="height: 400px">
  <div style="padding: 1em">
    <h2>Revenue Heatmap by Category & Season</h2>
    ${resize((width, height) => revenueHeatmap(width, height - 100))}
  </div>
</div>

<div class="grid grid-cols-2">
  <div class="card" style="height: 400px">
    <h2>Age vs Purchase Amount Analysis</h2>
    ${resize((width, height) => ageSpendChart(width, height - 50))}
  </div>
  <div class="card" style="height: 400px">
    <h2>Geographic Revenue Distribution</h2>
    ${resize((width, height) => geographicChart(width, height - 50))}
  </div>
</div>

<div class="grid grid-cols-2">
  <div class="card" style="height: 400px">
    <h2>Customer Loyalty & Spending Patterns</h2>
    ${resize((width, height) => loyaltyChart(width, height - 50))}
  </div>
  <div class="card" style="height: 400px">
    <h2>Review Rating Distribution by Category</h2>
    ${resize((width, height) => ratingDistributionChart(width, height - 50))}
  </div>
</div>

<div class="grid card" style="height: 500px">
  <div style="padding: 1em">
    <h2>Advanced Customer Segmentation Matrix</h2>
    <h3>Purchase Frequency vs Average Order Value</h3>
    ${resize((width, height) => customerSegmentationChart(width, height - 100))}
  </div>
</div>

<div class="grid grid-cols-3">
  <div class="card" style="height: 350px">
    <h2>Discount Impact Analysis</h2>
    ${resize((width, height) => discountImpactChart(width, height - 50))}
  </div>
  <div class="card" style="height: 350px">
    <h2>Shipping Preferences</h2>
    ${resize((width, height) => shippingChart(width, height - 50))}
  </div>
  <div class="card" style="height: 350px">
    <h2>Size Popularity by Category</h2>
    ${resize((width, height) => sizeAnalysisChart(width, height - 50))}
  </div>
</div>

<div class="card" style="padding: 0">
  <div style="padding: 1em">
    <h2>Customer Transaction Explorer</h2>
    ${display(customerSearch)}
  </div>
  ${display(Inputs.table(customerSearchValue, {
      columns: [
        "Customer ID",
        "Age", 
        "Gender",
        "Item Purchased",
        "Category",
        "Purchase Amount (USD)",
        "Location",
        "Season",
        "Review Rating",
        "Subscription Status",
        "Payment Method",
        "Discount Applied",
        "Previous Purchases"
      ],
      header: {
        "Customer ID": "ID",
        "Age": "Age",
        "Gender": "Gender", 
        "Item Purchased": "Item",
        "Category": "Category",
        "Purchase Amount (USD)": "Amount ($)",
        "Location": "Location",
        "Season": "Season",
        "Review Rating": "Rating",
        "Subscription Status": "Subscriber",
        "Payment Method": "Payment",
        "Discount Applied": "Discount",
        "Previous Purchases": "Prev. Purchases"
      },
      width: {
        "Item Purchased": 150,
        "Location": 100,
        "Payment Method": 120
      },
      format: {
        "Purchase Amount (USD)": d => `$${d}`,
        "Review Rating": d => `${d} ⭐`,
        "Age": d => `${d}`,
        "Previous Purchases": d => `${d}`
      }
    }))}
</div>

**Data source:** Consumer Shopping Trends Dataset - Comprehensive retail analytics and customer behavior study.

```js
// Data filtering logic
const filteredData = shoppingData.filter(d => {
  const categoryMatch = pickCategory.includes("All") || pickCategory.includes(d.Category);
  
  let ageMatch = true;
  if (ageGroup !== "All") {
    const age = d.Age;
    switch(ageGroup) {
      case "Gen Z (18-25)": ageMatch = age >= 18 && age <= 25; break;
      case "Millennials (26-40)": ageMatch = age >= 26 && age <= 40; break;
      case "Gen X (41-55)": ageMatch = age >= 41 && age <= 55; break;
      case "Boomers (56+)": ageMatch = age >= 56; break;
    }
  }
  
  return categoryMatch && ageMatch;
});

// Helper functions for big numbers
function getYearRange() {
  return "2023-2024"; // Placeholder since we don't have date data
}

function getAOVTrend() {
  const avgAll = d3.mean(shoppingData, d => d["Purchase Amount (USD)"]);
  const avgFiltered = d3.mean(filteredData, d => d["Purchase Amount (USD)"]);
  const diff = ((avgFiltered - avgAll) / avgAll * 100);
  return diff > 0 ? `+${diff.toFixed(1)}% vs all` : `${diff.toFixed(1)}% vs all`;
}

function getCustomerGrowth() {
  const totalCustomers = new Set(shoppingData.map(d => d["Customer ID"])).size;
  const filteredCustomers = new Set(filteredData.map(d => d["Customer ID"])).size;
  return `${(filteredCustomers / totalCustomers * 100).toFixed(1)}% of total`;
}

function getRatingTrend() {
  const avgRatingAll = d3.mean(shoppingData, d => d["Review Rating"]);
  const avgRatingFiltered = d3.mean(filteredData, d => d["Review Rating"]);
  const diff = avgRatingFiltered - avgRatingAll;
  return diff > 0 ? `+${diff.toFixed(2)} vs avg` : `${diff.toFixed(2)} vs avg`;
}

function getSubscriptionTrend() {
  const subRateAll = d3.sum(shoppingData, d => d["Subscription Status"] === "Yes" ? 1 : 0) / shoppingData.length * 100;
  const subRateFiltered = d3.sum(filteredData, d => d["Subscription Status"] === "Yes" ? 1 : 0) / filteredData.length * 100;
  const diff = subRateFiltered - subRateAll;
  return diff > 0 ? `+${diff.toFixed(1)}% vs avg` : `${diff.toFixed(1)}% vs avg`;
}

// Data aggregations
const categoryBreakdown = d3.rollups(
  filteredData,
  v => v.length,
  d => d.Category
).map(([name, value]) => ({name, value}))
.sort((a, b) => d3.descending(a.value, b.value));

const seasonBreakdown = d3.rollups(
  filteredData,
  v => v.length,
  d => d.Season
).map(([name, value]) => ({name, value}));

const genderBreakdown = d3.rollups(
  filteredData,
  v => v.length,
  d => d.Gender
).map(([name, value]) => ({name, value}));

const paymentBreakdown = d3.rollups(
  filteredData,
  v => v.length,
  d => d["Payment Method"]
).map(([name, value]) => ({name, value}))
.sort((a, b) => d3.descending(a.value, b.value));

// Search functionality
const customerSearch = Inputs.search(filteredData);
const customerSearchValue = view(customerSearch);
```

```js
// Revenue Heatmap
function revenueHeatmap(width, height) {
  const heatmapData = d3.rollups(
    filteredData,
    v => d3.sum(v, d => d["Purchase Amount (USD)"]),
    d => d.Category,
    d => d.Season
  ).flatMap(([category, seasonData]) =>
    seasonData.map(([season, revenue]) => ({category, season, revenue}))
  );

  const maxRevenue = d3.max(heatmapData, d => d.revenue);

  return Plot.plot({
    width,
    height,
    marginLeft: 100,
    marginBottom: 60,
    x: {label: "Season", domain: ["Spring", "Summer", "Fall", "Winter"]},
    y: {label: "Category", domain: [...new Set(filteredData.map(d => d.Category))]},
    color: {
      type: "linear",
      scheme: "viridis",
      domain: [0, maxRevenue],
      legend: true,
      label: "Revenue ($)"
    },
    marks: [
      Plot.cell(heatmapData, {
        x: "season",
        y: "category",
        fill: "revenue",
        inset: 2,
        rx: 4,
        tip: {
          format: {
            revenue: d => `$${d3.format(",.0f")(d)}`
          }
        }
      }),
      Plot.text(heatmapData, {
        x: "season",
        y: "category",
        text: d => `$${d3.format(".0s")(d.revenue)}`,
        fill: "white",
        fontSize: 10,
        fontWeight: "bold"
      })
    ]
  });
}
```

```js
// Age vs Purchase Amount Analysis
function ageSpendChart(width, height) {
  return Plot.plot({
    width,
    height,
    marginLeft: 60,
    marginBottom: 40,
    x: {label: "Age", grid: true, domain: [15, 70]},
    y: {label: "Purchase Amount ($)", grid: true},
    color: {scheme: "turbo", label: "Review Rating"},
    marks: [
      Plot.dot(filteredData, {
        x: "Age",
        y: "Purchase Amount (USD)",
        fill: "Review Rating",
        r: 4,
        fillOpacity: 0.7,
        stroke: "white",
        strokeWidth: 0.5,
        tip: {
          format: {
            "Purchase Amount (USD)": d => `$${d}`,
            "Review Rating": d => `${d} ⭐`
          }
        }
      }),
      Plot.linearRegressionY(filteredData, {
        x: "Age",
        y: "Purchase Amount (USD)",
        stroke: "#FF6B6B",
        strokeWidth: 3,
        strokeDasharray: "5,5"
      })
    ]
  });
}
```

```js
// Geographic Revenue Distribution
function geographicChart(width, height) {
  const locationData = d3.rollups(
    filteredData,
    v => ({
      revenue: d3.sum(v, d => d["Purchase Amount (USD)"]),
      customers: new Set(v.map(d => d["Customer ID"])).size,
      avgRating: d3.mean(v, d => d["Review Rating"])
    }),
    d => d.Location
  ).map(([location, data]) => ({location, ...data}))
  .sort((a, b) => d3.descending(a.revenue, b.revenue))
  .slice(0, 15);

  return Plot.plot({
    width,
    height,
    marginLeft: 80,
    marginBottom: 80,
    x: {label: "Location", tickRotate: 45},
    y: {label: "Revenue ($)", grid: true},
    color: {scheme: "spectral", domain: d3.extent(locationData, d => d.avgRating)},
    marks: [
      Plot.barY(locationData, {
        x: "location",
        y: "revenue",
        fill: "avgRating",
        tip: {
          format: {
            revenue: d => `$${d3.format(",.0f")(d)}`,
            customers: d => `${d} customers`,
            avgRating: d => `${d.toFixed(1)} ⭐`
          }
        }
      }),
      Plot.text(locationData, {
        x: "location",
        y: "revenue",
        text: d => `$${d3.format(".0s")(d.revenue)}`,
        dy: -5,
        fontSize: 9,
        fontWeight: "bold"
      })
    ]
  });
}
```

```js
// Customer Loyalty Chart
function loyaltyChart(width, height) {
  const loyaltyData = filteredData.map(d => ({
    ...d,
    isLoyal: d["Previous Purchases"] >= 10,
    spendPerPurchase: d["Purchase Amount (USD)"] / Math.max(1, d["Previous Purchases"])
  }));

  return Plot.plot({
    width,
    height,
    marginLeft: 60,
    marginBottom: 40,
    x: {label: "Previous Purchases", grid: true},
    y: {label: "Purchase Amount ($)", grid: true},
    color: {domain: ["Yes", "No"], range: ["#4ECDC4", "#FF6B6B"], label: "Subscriber"},
    marks: [
      Plot.dot(loyaltyData, {
        x: "Previous Purchases",
        y: "Purchase Amount (USD)",
        fill: "Subscription Status",
        r: d => Math.sqrt(d["Review Rating"]) * 2,
        fillOpacity: 0.7,
        stroke: "white",
        strokeWidth: 1,
        tip: {
          format: {
            "Purchase Amount (USD)": d => `$${d}`,
            "Previous Purchases": d => `${d}`,
            "Review Rating": d => `${d} ⭐`
          }
        }
      })
    ]
  });
}
```

```js
// Review Rating Distribution
function ratingDistributionChart(width, height) {
  return Plot.plot({
    width,
    height,
    marginLeft: 60,
    marginBottom: 60,
    x: {label: "Review Rating", domain: [1, 5], ticks: 9},
    y: {label: "Count", grid: true},
    fy: {label: "Category", domain: [...new Set(filteredData.map(d => d.Category))]},
    color: {scheme: "warm"},
    marks: [
      Plot.rectY(
        filteredData,
        Plot.binX(
          {y: "count", fill: "median"},
          {
            x: "Review Rating",
            fill: "Purchase Amount (USD)",
            fy: "Category",
            interval: 0.2,
            tip: true
          }
        )
      ),
      Plot.axisX({ticks: 5}),
      Plot.axisY({ticks: 3})
    ]
  });
}
```

```js
// Customer Segmentation Matrix
function customerSegmentationChart(width, height) {
  const frequencyMap = {
    "Weekly": 52,
    "Fortnightly": 26,
    "Monthly": 12,
    "Quarterly": 4,
    "Annually": 1,
    "Bi-Weekly": 26,
    "Every 3 Months": 4
  };

  const segmentData = d3.rollups(
    filteredData,
    v => ({
      avgAmount: d3.mean(v, d => d["Purchase Amount (USD)"]),
      count: v.length,
      avgRating: d3.mean(v, d => d["Review Rating"]),
      subRate: d3.sum(v, d => d["Subscription Status"] === "Yes" ? 1 : 0) / v.length
    }),
    d => d["Frequency of Purchases"]
  ).map(([frequency, data]) => ({
    frequency,
    annualFrequency: frequencyMap[frequency] || 12,
    ...data
  }));

  return Plot.plot({
    width,
    height,
    marginLeft: 80,
    marginBottom: 60,
    x: {label: "Purchase Frequency (Annual)", grid: true, type: "log"},
    y: {label: "Average Order Value ($)", grid: true},
    color: {scheme: "plasma", domain: [0, 1], label: "Subscription Rate"},
    marks: [
      Plot.dot(segmentData, {
        x: "annualFrequency",
        y: "avgAmount",
        r: d => Math.sqrt(d.count) * 2,
        fill: "subRate",
        stroke: "white",
        strokeWidth: 2,
        fillOpacity: 0.8,
        tip: {
          format: {
            frequency: true,
            avgAmount: d => `$${d.toFixed(2)}`,
            count: d => `${d} customers`,
            subRate: d => `${(d * 100).toFixed(1)}% subscribers`
          }
        }
      }),
      Plot.text(segmentData, {
        x: "annualFrequency",
        y: "avgAmount",
        text: "frequency",
        dy: -15,
        fontSize: 9,
        fontWeight: "bold",
        textAnchor: "middle"
      })
    ]
  });
}
```

```js
// Discount Impact Analysis
function discountImpactChart(width, height) {
  const discountData = d3.rollups(
    filteredData,
    v => ({
      avgAmount: d3.mean(v, d => d["Purchase Amount (USD)"]),
      count: v.length,
      avgRating: d3.mean(v, d => d["Review Rating"])
    }),
    d => d["Discount Applied"]
  ).map(([discount, data]) => ({discount, ...data}));

  return Plot.plot({
    width,
    height,
    marginLeft: 60,
    marginBottom: 40,
    x: {label: "Discount Applied"},
    y: {label: "Average Purchase Amount ($)", grid: true},
    color: {domain: ["Yes", "No"], range: ["#FF6B6B", "#4ECDC4"]},
    marks: [
      Plot.barY(discountData, {
        x: "discount",
        y: "avgAmount",
        fill: "discount",
        tip: {
          format: {
            avgAmount: d => `$${d.toFixed(2)}`,
            count: d => `${d} transactions`,
            avgRating: d => `${d.toFixed(1)} ⭐`
          }
        }
      }),
      Plot.text(discountData, {
        x: "discount",
        y: "avgAmount",
        text: d => `$${d.avgAmount.toFixed(0)}`,
        dy: -5,
        fontSize: 12,
        fontWeight: "bold"
      })
    ]
  });
}
```

```js
// Shipping Preferences
function shippingChart(width, height) {
  const shippingData = d3.rollups(
    filteredData,
    v => d3.sum(v, d => d["Purchase Amount (USD)"]),
    d => d["Shipping Type"]
  ).map(([type, revenue]) => ({type, revenue}))
  .sort((a, b) => d3.descending(a.revenue, b.revenue));

  return Plot.plot({
    width,
    height,
    marginLeft: 80,
    marginBottom: 40,
    x: {label: "Shipping Type"},
    y: {label: "Total Revenue ($)", grid: true},
    color: {scheme: "category10"},
    marks: [
      Plot.barY(shippingData, {
        x: "type",
        y: "revenue",
        fill: "type",
        tip: {
          format: {
            revenue: d => `$${d3.format(",.0f")(d)}`
          }
        }
      }),
      Plot.text(shippingData, {
        x: "type",
        y: "revenue",
        text: d => `$${d3.format(".0s")(d.revenue)}`,
        dy: -5,
        fontSize: 10,
        fontWeight: "bold "
      })
    ]
  });
}
```

```js
// Size Analysis by Category
function sizeAnalysisChart(width, height) {
  const sizeData = d3.rollups(
    filteredData.filter(d => d.Size && d.Size !== ""),
    v => v.length,
    d => d.Size,
    d => d.Category
  ).flatMap(([size, categoryData]) =>
    categoryData.map(([category, count]) => ({size, category, count}))
  );

  return Plot.plot({
    width,
    height,
    marginLeft: 60,
    marginBottom: 40,
    x: {label: "Size"},
    y: {label: "Count", grid: true},
    color: {scheme: "tableau10", label: "Category"},
    marks: [
      Plot.barY(sizeData, {
        x: "size",
        y: "count",
        fill: "category",
        tip: true
      }),
      Plot.axisX({tickRotate: 0})
    ]
  });
}
```