"use client"

import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "next/link";
import Typography from "@mui/joy/Typography";

export default function ProductListPage(){
	return (
		<div>

			<TabsPricingExample />

		</div>
	)
}



import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import DataTableProductList from "@/services/products/Views/DataTableProductList";
import ProductCreateForm from "@/services/products/Views/ProductCreateForm";

export function TabsPricingExample() {
	return (
		<Tabs aria-label="Basic tabs" defaultValue={0} >
			<TabList>
				<Tab>All Products</Tab>
				<Tab>Add New Product</Tab>
				<Tab>Packages</Tab>
				<Tab>Pricing</Tab>
			</TabList>
			<TabPanel value={0} className={'bg-red-100'}>
				<DataTableProductList />
			</TabPanel>
			<TabPanel value={1} className={'bg-red-100'}>
				<ProductCreateForm />
			</TabPanel>
			<TabPanel value={2} className={'bg-red-100'}>
				<b>Third</b> tab panel
			</TabPanel>
		</Tabs>
	);
}