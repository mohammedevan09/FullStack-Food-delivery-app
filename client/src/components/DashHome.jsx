import React, { useEffect } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsivePie } from '@nivo/pie'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../api'
import { setAllProducts } from '../context/reducers/productsReducer'

const DashHome = () => {
  const dispatch = useDispatch()

  let products = useSelector((state) => state?.products?.state)

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data))
      })
    }
  }, [])

  //Formation

  // Bar Format
  let formattedProduct = []
  let productKeys = []
  let maxValue = 0

  if (products) {
    formattedProduct = products.reduce((acc, curr) => {
      const { product_category, product_name, product_price } = curr
      const existingCategory = acc.find(
        (item) => item.product_category === product_category
      )

      if (existingCategory) {
        existingCategory[product_name] = product_price
      } else {
        const newCategory = {
          product_category: product_category,
          [product_name]: product_price,
        }
        acc.push(newCategory)
      }

      return acc
    }, [])

    productKeys = products.reduce((acc, curr) => {
      const { product_name } = curr

      if (!acc.includes(product_name)) {
        acc.push(product_name)
      }
      return acc
    }, [])

    for (let i = 0; i < products.length; i++) {
      if (products[i].product_price > maxValue) {
        maxValue = Number(products[i].product_price)
      }
    }
  }

  // Pie format
  let pieFormattedProducts = []
  let pieProductKeys = []

  if (products) {
    pieFormattedProducts = products.reduce((acc, curr) => {
      const { product_category } = curr

      let existingCategory = acc.find((item) => item.id == product_category)

      if (existingCategory) {
        existingCategory.value++
      } else {
        const newCategory = {
          id: product_category,
          label: product_category,
          value: 1,
          color:
            '#' +
            (0x1000000 + Math.random() * 0xffffff).toString(32).substr(1, 6),
        }
        acc.push(newCategory)
      }
      return acc
    }, [])
  }
  // console.log(pieFormattedProducts)

  return (
    <div className="flex items-center  justify-center flex-col pt-6 w-full h-full">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full">
        {/*Bar chart*/}
        <div className="flex items-center justify-center sm:order-1 order-3">
          <ResponsiveBar
            data={formattedProduct}
            keys={productKeys}
            indexBy="product_category"
            margin={{ top: 140, right: 130, bottom: 110, left: 60 }}
            maxValue={maxValue}
            padding={0.4}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: 'white',
                  },
                },
                legend: {
                  text: {
                    fill: 'white',
                  },
                },
                ticks: {
                  line: {
                    stroke: 'white',
                    strokeWidth: 1,
                  },
                  text: {
                    fill: 'white',
                  },
                },
              },
              legends: {
                text: {
                  fill: 'white',
                },
              },
              tooltip: {
                container: {
                  color: 'black',
                },
              },
            }}
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: 'fries',
                },
                id: 'dots',
              },
              {
                match: {
                  id: 'sandwich',
                },
                id: 'lines',
              },
            ]}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 1.6]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'product_category',
              legendPosition: 'middle',
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'food',
              legendPosition: 'middle',
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: 'color',
              modifiers: [['darker', 3]],
            }}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 121,
                itemsSpacing: 10,
                itemWidth: 99,
                itemHeight: 10,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            isFocusable={true}
            barAriaLabel={(e) =>
              e.id + ': ' + e.formattedProduct + ' in country: ' + e.indexValue
            }
          />
        </div>

        {/*Pie chart*/}
        <div className="w-full h-full flex items-center justify-center sm:order-2 order-1">
          {' '}
          <ResponsivePie
            data={pieFormattedProducts}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            startAngle={-180}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="white"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: 'color',
              modifiers: [['darker', 3]],
            }}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: 'transparent',
                    strokeWidth: 1,
                  },
                },
                ticks: {
                  line: {
                    stroke: '#777777',
                    strokeWidth: 1,
                  },
                  text: {},
                },
                legend: {
                  text: {
                    fontSize: '12px',
                  },
                },
              },
              grid: {
                line: {
                  stroke: '#dddddd',
                  strokeWidth: 1,
                },
              },
              legends: {
                text: {
                  fill: '#333333',
                },
              },
              labels: {
                text: {
                  fontSize: '14px',
                },
              },
              markers: {
                lineColor: '#000000',
                lineStrokeWidth: 1,
                text: {},
              },
              dots: {
                text: {},
              },
              tooltip: {
                container: {
                  background: 'black',
                  color: 'inherit',
                  fontSize: 'inherit',
                  borderRadius: '2px',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
                  padding: '5px 9px',
                },
                basic: {
                  whiteSpace: 'pre',
                  display: 'flex',
                  alignItems: 'center',
                },
                table: {},
                tableCell: {
                  padding: '3px 5px',
                },
              },
              crosshair: {
                line: {
                  stroke: '#000000',
                  strokeWidth: 1,
                  strokeOpacity: 0.75,
                  strokeDasharray: '6 6',
                },
              },
              annotations: {
                text: {
                  fontSize: 13,
                  outlineWidth: 2,
                  outlineColor: '#ffffff',
                },
                link: {
                  stroke: '#000000',
                  strokeWidth: 1,
                  outlineWidth: 2,
                  outlineColor: '#ffffff',
                },
                outline: {
                  fill: 'none',
                  stroke: '#000000',
                  strokeWidth: 2,
                  outlineWidth: 2,
                  outlineColor: '#ffffff',
                },
                symbol: {
                  fill: '#000000',
                  outlineWidth: 2,
                  outlineColor: '#ffffff',
                },
              },
            }}
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 46,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000',
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default DashHome
