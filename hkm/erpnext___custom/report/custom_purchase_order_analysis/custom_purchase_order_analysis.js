// Copyright (c) 2016, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Custom Purchase Order Analysis"] = {
	"filters": [
		{
			"fieldname": "company",
			"label": __("Company"),
			"fieldtype": "Link",
			"width": "80",
			"options": "Company",
			"reqd": 1,
			"default": frappe.defaults.get_default("company")
		},
		{
			"fieldname": "department",
			"label": __("Department"),
			"fieldtype": "Link",
			"width": "80",
			"options": "Department",
			"default": frappe.defaults.get_default("department")
		},
		{
			"fieldname":"from_date",
			"label": __("From Date"),
			"fieldtype": "Date",
			"width": "80",
			"reqd": 1,
			"default": frappe.datetime.add_months(frappe.datetime.get_today(), -1),
		},
		{
			"fieldname":"to_date",
			"label": __("To Date"),
			"fieldtype": "Date",
			"width": "80",
			"reqd": 1,
			"default": frappe.datetime.get_today()
		},
		{
			"fieldname": "purchase_order",
			"label": __("Purchase Order"),
			"fieldtype": "Link",
			"width": "80",
			"options": "Purchase Order",
			"get_query": () =>{
				return {
					filters: { "docstatus": 1 }
				}
			}
		},
		{
			"fieldname": "status",
			"label": __("Status"),
			"fieldtype":"Select",
			"width":"80",
			"options": ["To Invoice","To Receive", "To Receive and Bill", "Completed"]
			// "fieldtype": "MultiSelectList",
			// "width": "80",
			// get_data: function(txt) {
			// 	let status = ["To Invoice","To Receive", "To Receive and Bill", "Completed"]
			// 	let options = []
			// 	for (let option of status){
			// 		options.push({
			// 			"value": option,
			// 			"description": ""
			// 		})
			// 	}
			// 	return options
			// }
		},
		{
			"fieldname": "group_by_po",
			"label": __("Group by Purchase Order"),
			"fieldtype": "Check",
			"default": 0
		}
	],

	"formatter": function (value, row, column, data, default_formatter) {
		value = default_formatter(value, row, column, data);
		let format_fields = ["received_qty", "billed_amount"];

		if (in_list(format_fields, column.fieldname) && data && data[column.fieldname] > 0) {
			value = "<span style='color:green'>" + value + "</span>";
		}
		return value;
	}
};
