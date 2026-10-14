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
}: {
  onViewAll: () => void;
  printRequest: PrintRequest | null;
}) => {
  const [selectedException, setSelectedException] =
    useState<ExceptionOrder | null>(null);
  const [employeeToReport, setEmployeeToReport] = useState<string | null>(null);
  const [isPrintOrderModalOpen, setPrintOrderModalOpen] = useState(false);

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-3">
        <ExceptionOrders onReassign={setSelectedException} />
        <WorkerProgressPanel
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
        />
      )}
      {employeeToReport && (
        <OffModal
          employeeName={employeeToReport}
          onClose={() => setEmployeeToReport(null)}
        />
      )}
      {isPrintOrderModalOpen && printRequest && (
        <PrintOrderModal
          printRequest={printRequest}
          setPrintOrderModalOpen={setPrintOrderModalOpen}
        />
      )}
    </>
  );
};

export default ProcessTab;
