import React from "react";
import {
	Box,
	SimpleGrid,
} from "@chakra-ui/react";
// Assets
// Custom components
import ComplexTable from "views/admin/default/components/ComplexTable";
import {
	columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import AppInformation from "views/admin/default/components/AppInformation"

class MainReport extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		fetch('./app.json')
        	.then(response => response.json())
        	.then(data => this.setState({ app: data }));
	}

	render() {
		return (
			<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
				<SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
					<AppInformation
						minH='365px'
						pe='20px'
					/>
					<ComplexTable
						columnsData={columnsDataComplex}
						tableData={tableDataComplex}
					/>
				</SimpleGrid>
			</Box>
		);
	}
}

export default MainReport;