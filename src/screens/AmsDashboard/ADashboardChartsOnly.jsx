import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AmsDashboardCharts from "./AmsDashboardCharts";
import { MOCK_DASHBOARD } from "../../../mock/mockAmsDashboardData";

import {
  load_demo_dashboard,
  cabinetstatus,
  eventlist,
  eventlist_popup,
  activitylist,
  activitylist_popup,
  accesslist,
  testact_count,
  offlinesites,
} from "../../../actions/AmsDashboard/AmsDashboardAction";

const DEMO_DASHBOARD = process.env.REACT_APP_DEMO_DASHBOARD === "true";

export default function ADashboardChartsOnly() {
  const dispatch = useDispatch();

  const cabinetstatuss = useSelector((s) => s.Amsdashboard.cabinetstatus);
  const eventlists = useSelector((s) => s.Amsdashboard.eventlists);
  const activitylists = useSelector((s) => s.Amsdashboard.activitylists);
  const accesslists = useSelector((s) => s.Amsdashboard.accesslists);
  const testact_counts = useSelector((s) => s.Amsdashboard.testact_counts);

  const eventlists_popup = useSelector((s) => s.Amsdashboard.eventlists_popup);
  const activitylists_popup = useSelector((s) => s.Amsdashboard.activitylists_popup);
  const offlinesite = useSelector((s) => s.Amsdashboard.offlinesites);

  // trends (optional in live)
  const cabinetTrendLive = useSelector((s) => s.Amsdashboard.cabinetTrend);
  const eventsTrendLive = useSelector((s) => s.Amsdashboard.eventsTrend);
  const accessTrendLive = useSelector((s) => s.Amsdashboard.accessTrend);
  const testsTrendLive = useSelector((s) => s.Amsdashboard.testsTrend);

  React.useEffect(() => {
    if (DEMO_DASHBOARD) {
      dispatch(load_demo_dashboard());
      return;
    }

    dispatch(cabinetstatus());
    dispatch(eventlist());
    dispatch(eventlist_popup());
    dispatch(activitylist());
    dispatch(activitylist_popup());
    dispatch(accesslist());
    dispatch(testact_count());
    dispatch(offlinesites());
  }, [dispatch]);

  return (
    <div className="p-2">
      <AmsDashboardCharts
        DEMO_DASHBOARD={DEMO_DASHBOARD}
        MOCK_DASHBOARD={MOCK_DASHBOARD}
        cabinetstatuss={cabinetstatuss}
        eventlists={eventlists}
        activitylists={activitylists}
        accesslists={accesslists}
        testact_counts={testact_counts}
        eventlists_popup={eventlists_popup}
        activitylists_popup={activitylists_popup}
        offlinesite={offlinesite}
        cabinetTrendLive={cabinetTrendLive}
        eventsTrendLive={eventsTrendLive}
        accessTrendLive={accessTrendLive}
        testsTrendLive={testsTrendLive}
      />
    </div>
  );
}
