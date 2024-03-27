import {
	Flex,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue,
	Box,
	Stack,
	Code
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
	useGlobalFilter,
	usePagination,
	useSortBy,
	useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";


export default function LogTable(props) {
	const { columnsData, tableData } = props;

	const columns = useMemo(() => columnsData, [columnsData]);
	const data = useMemo(() => tableData, [tableData]);

	const tableInstance = useTable(
		{
			columns,
			data,
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		initialState,
	} = tableInstance;
	initialState.pageSize = 50;

	const textColor = useColorModeValue("secondaryGray.900", "white");
	const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

	return (
		    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          Logs
        </Text>
        <Menu />
      </Flex>
			<Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
				<Thead>
					{headerGroups.map((headerGroup, index) => (
						<Tr {...headerGroup.getHeaderGroupProps()} key={index}>
							{headerGroup.headers.map((column, index) => (
								<Th
									{...column.getHeaderProps(column.getSortByToggleProps())}
									pe='10px'
									key={index}
									borderColor={borderColor}>
									<Flex
										justify='space-between'
										align='center'
										fontSize={{ sm: "10px", lg: "12px" }}
										color='gray.400'>
										{column.render("Header")}
									</Flex>
								</Th>
							))}
						</Tr>
					))}
				</Thead>
				<Tbody {...getTableBodyProps()}>
					{page.map((row, index) => {
						prepareRow(row);
						return (
							<Tr {...row.getRowProps()} key={index}>
								{row.cells.map((cell, index) => {
									let data = "";
									if (cell.column.Header === "count") {
										data = (
											<Flex align='center'>
												<Text color={textColor} fontSize='sm' fontWeight='700'>
													{cell.value}
												</Text>
											</Flex>
										);
									} else if (cell.column.Header === "signature") {
										data = (
											<Code>{cell.value}</Code>
										);
									} else if (cell.column.Header === "argumentValues") {
										let cellValue = cell.value;
										let result = [];
										for (let key in cellValue) {
											if (cellValue.hasOwnProperty(key)) {
												result.push(
													<Code>
														{key}: {cellValue[key]}
													</Code>
												);
											}
										}
										data = (<Stack direction='column'>{result}</Stack>);
									} else if (cell.column.Header === "returnedVal") {
										let cellValue = cell.value;
										let result = [];
										for (let key in cellValue) {
											if (cellValue.hasOwnProperty(key)) {
												result.push(
													<Code>
														{key}: {cellValue[key]}
													</Code>
												);
											}
										}
										data = (<Stack direction='column'>{result}</Stack>);
									}
									return (
										<Td
											{...cell.getCellProps()}
											key={index}
											fontSize={{ sm: "10px" }}
											minW={{ sm: "10px", md: "10px", lg: "10px" }}
											borderColor='transparent'>
											{data}
										</Td>
									);
								})}
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</Card>
	);
}