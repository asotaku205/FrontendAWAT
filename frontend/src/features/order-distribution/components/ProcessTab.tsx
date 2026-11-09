import { useState } from "react";
import type { ExceptionOrder, PrintRequest } from "../../../services/types";
import OffModal from "./OffModal";
import PrintOrderModal from "./PrintOrderModal";
import { ExceptionOrders, ReadyOrders } from "./ProcessTabPanels";
import ReAssignModal from "./ReAssignModal";
import WorkerProgressPanel from "./WorkerProgressPanel";

const ProcessTab = ({
  onViewAll,
  printRequest,
  onPrintConfirmed,
}: {
  onViewAll: () => void;
  printRequest: PrintRequest | null;
  onPrintConfirmed: () => void;
}) => {
  const [selectedException, setSelectedException] =
    useState<ExceptionOrder | null>(null);
  const [employeeToReport, setEmployeeToReport] = useState<string | null>(null);
  const [isPrintOrderModalOpen, setPrintOrderModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-3">
        <ExceptionOrders
          refreshKey={refreshKey}
          onReassign={setSelectedException}
        />
        <WorkerProgressPanel
          refreshKey={refreshKey}
          onReportAbsence={setEmployeeToReport}
          onPrintOrder={() => setPrintOrderModalOpen(true)}
          onViewAll={onViewAll}
        />
        <ReadyOrders onViewAll={onViewAll} />
      </div>
      {selectedException && (
        <ReAssignModal
          order={selectedException}
          onClose={() => setSelectedException(null)}
          onConfirmed={() => {
            setSelectedException(null);
            setRefreshKey((current) => current + 1);
          }}
        />
      )}
      {employeeToReport && (
        <OffModal
          employeeName={employeeToReport}
          onClose={() => setEmployeeToReport(null)}
          onConfirmed={() => {
            setEmployeeToReport(null);
            setRefreshKey((current) => current + 1);
          }}
        />
      )}
      {isPrintOrderModalOpen && printRequest && (
        <PrintOrderModal
          printRequest={printRequest}
          setPrintOrderModalOpen={setPrintOrderModalOpen}
          onConfirmed={() => {
            setPrintOrderModalOpen(false);
            setRefreshKey((current) => current + 1);
            onPrintConfirmed();
          }}
        />
      )}
    </>
  );
};

export default ProcessTab;
