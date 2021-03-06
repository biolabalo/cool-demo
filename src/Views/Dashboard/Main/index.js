import React, { useEffect, useReducer } from "react";
import Highlight from "./Highlight";
import TopStat from "./TopStat";
import RecentSalesTable from "./RecentSales";
import {
  Bag,
  BitcoinIcon,
  Tickets as TicketsSVG,
  DeliveryIcon,
  ArrowRight
} from "../../../svg";
import { fetchMainDashboard } from "../../../actions/shopping";
import shoppingReducer from "../../../reducers/shopping";
import { shopping } from "../../../reducers/initialState";
import { ContextShopping } from "../../../context";




import { useTable } from "react-table";

const RecentSales = () => {
  const data = React.useMemo(
    () => [
      {
        transactionType: (
          <>
            <div className="relative w-8 h-4 inline-block">
              <div className="absolute animate-ping w-5 bg-lime-100 mr-2 h-5 inline-block rounded-full"></div>
              <div className="absolute top-1 left-1 w-3 bg-lime-400 h-3 inline-block rounded-full"></div>
            </div>
            Shopping
          </>
        ),
        orderId: "12230223938489",
        amount: (
          <p className="text-right">
            {Number(120000).toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </p>
        ),
      },
      {
        transactionType: (
          <>
            <div className="relative w-8 h-4 inline-block">
              <div className="absolute animate-ping w-5 bg-green-100 mr-2 h-5 inline-block rounded-full"></div>
              <div className="absolute top-1 left-1 w-3 bg-green-400 h-3 inline-block rounded-full"></div>
            </div>
            Delivery
          </>
        ),
        orderId: "12230223938489",
        amount: (
          <p className="text-right">
            {Number(4450).toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </p>
        ),
      },
      {
        transactionType: (
          <>
            <div className="relative w-8 h-4 inline-block">
              <div className="absolute animate-ping w-5 bg-purple-100 mr-2 h-5 inline-block "></div>
              <div className="absolute top-1 left-1 w-3 bg-purple-400 h-3 inline-block "></div>
            </div>
            Tickets
          </>
        ),
        
        orderId: "12230223938489",
        amount: (
          <p className="text-right">
            {Number(12000).toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </p>
        ),
      }
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      { Header: " ", accessor: "transactionType" },
      { Header: " ", accessor: "amount" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="overflow-x-scroll">
      <table {...getTableProps()} className="w-full text-sm">
        <thead className="text-left border-b-2 border-gray-100">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="pb-4 font-normal last:text-right"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      style={{ minWidth: "120px" }}
                      className="border-b-2 pr-4 min-w-max last:pr-0 border-gray-100 py-4"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};






const Main = () => {
  const [state, dispatch] = useReducer(shoppingReducer, shopping);
  const { admin, loading } = state;
  useEffect(() => {
    fetchMainDashboard(dispatch);
  }, [dispatch]);
  return (
    <ContextShopping.Provider value={[state, dispatch]}>
      <div className="flex flex-col flex-1 w-7/12 md:w-full md:mt-8">
        <div className="mt-5 p-10  md:py-0 md:px-0 md:mt-0 rounded-3xl md:rounded-none bg-white">
          <h3 className="text-2xl md:pb-6 md:bg-white tracking-wider">
            Your Orders
          </h3>
          <div class="flex space-x-4 ...">
            <div class="flex-1 ...">Pie chart</div>
            <div class="flex-1 ...">
              < RecentSales />
            </div>
          </div>
        </div>

        {/* <div className="flex w-full justify-between md:justify-around md:flex-wrap">
          <TopStat
            title="Shopping"
            value={admin.shopping}
            caption="New orders in the last 24 hours"
            svg={<Bag color="white" scale={0.5} />}
            color="lime"
            loading={loading}
          />
          <TopStat
            title="Delivery"
            value={admin.delivery}
            caption="Delivery orders in the last 24 hours"
            svg={<DeliveryIcon color="white" scale={0.5} />}
            loading={loading}
            color="green"
          />
          <TopStat
            title="Tickets"
            value={admin.tickets}
            caption="Tickets sold in the last 24 hours"
            svg={<TicketsSVG color="white" scale={0.5} />}
            color="purple"
            loading={loading}
          />
          <TopStat
            title="Trading"
            value={admin.trading}
            // last
            caption="Items traded in the last 24 hours"
            svg={<BitcoinIcon color="white" scale={0.5} />}
            color="yellow"
            loading={loading}
          />
        </div> */}
        <div className="mt-8 mb-4 md:-mx-6 md:bg-white md:py-8 md:px-10 md:px-4">
          <h3 className="text-2xl md:pb-6 md:bg-white tracking-wider">
            Recent Sales
          </h3>
          <div className="mt-5 py-8 px-10 md:py-0 md:px-0 md:mt-0 rounded-3xl md:rounded-none bg-white">
            <RecentSalesTable />
            <div className="flex justify-between mt-8 pb-8 w-full">
              <span className="text-gray-500">Showing 8 of 100</span>
              <div className="flex items-center text-purple-500">
                See all &nbsp; <ArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex ml-5 flex-col tracking-wide md:w-6/12 sm:w-10/12">
        <Highlight />
      </div>
    </ContextShopping.Provider>
  );
};

export default Main;
