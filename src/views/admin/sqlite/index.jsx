
import { Box, SimpleGrid } from "@chakra-ui/react";
import LogTable from "views/admin/dataTables/components/LogTable";
import {
  columnsDataColumns,
} from "views/admin/default/variables/logColumns";
import tableDataColumns from "views/admin/default/variables/logData.json";
import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <LogTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />
      </SimpleGrid>
    </Box>
  );
}
