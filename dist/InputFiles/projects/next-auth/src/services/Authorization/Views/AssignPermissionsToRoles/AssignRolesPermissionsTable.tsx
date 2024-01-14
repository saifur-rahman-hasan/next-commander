"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import Sheet from "@mui/joy/Sheet";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import * as React from "react";
// icons
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress } from "@mui/joy";
import useSWR from "swr";

// The array with 10 objects

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)

export default function AssignRolesPermissionsTable({
  isFormSubmitted,
  resetFormSubmissionStatus,
}: {
  isFormSubmitted?: boolean;
  resetFormSubmissionStatus?: any;
}) {
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);

  const fetcher = (url: any) => fetch(url).then((res) => res.json());

  // Use swr to fetch and cache data
  const {
    data: rows,
    isLoading,
    mutate,
  } = useSWR("/api/authorization/role-has-permission", fetcher);

  // React.useEffect is used to revalidate data when isFormSubmitted changes
  React.useEffect(() => {
    if (isFormSubmitted) {
      // Revalidate (refetch) the data
      mutate();
      resetFormSubmissionStatus();
    }
  }, [isFormSubmitted, resetFormSubmissionStatus]);

  const deleteRoleData = async (role_id: string, permission_ids: any) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const response = await fetch(`/api/authorization/role-has-permission`, {
        method: "DELETE",
        body: JSON.stringify({ role_id, permission_ids }),
      });
      try {
        const responseData = await response.json();
        if (response.ok) {
          mutate();
          console.log(responseData.message);
        } else {
          console.log(responseData.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        >
          <Option value="paid">Paid</Option>
          <Option value="pending">Pending</Option>
          <Option value="refunded">Refunded</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Category</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="refund">Refund</Option>
          <Option value="purchase">Purchase</Option>
          <Option value="debit">Debit</Option>
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Users</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="olivia">Olivia Rhye</Option>
          <Option value="steve">Steve Hampton</Option>
          <Option value="ciaran">Ciaran Murray</Option>
          <Option value="marina">Marina Macdonald</Option>
          <Option value="charles">Charles Fulton</Option>
          <Option value="jay">Jay Hoper</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <React.Fragment>
          <Sheet
            className="SearchAndFilters-mobile"
            sx={{
              display: {
                xs: "flex",
                sm: "none",
              },
              my: 1,
              gap: 1,
            }}
          >
            <Input
              size="sm"
              placeholder="Search"
              startDecorator={<SearchIcon />}
              sx={{ flexGrow: 1 }}
            />

            <IconButton
              size="sm"
              variant="outlined"
              color="neutral"
              onClick={() => setOpen(true)}
            >
              <FilterAltIcon />
            </IconButton>

            <Modal open={open} onClose={() => setOpen(false)}>
              <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
                <ModalClose />
                <Typography id="filter-modal" level="h2">
                  Filters
                </Typography>
                <Divider sx={{ my: 2 }} />
              </ModalDialog>
            </Modal>
          </Sheet>

          <Box
            className="SearchAndFilters-tabletUp"
            sx={{
              borderRadius: "sm",
              py: 2,
              display: {
                xs: "none",
                sm: "flex",
              },
              flexWrap: "wrap",
              gap: 1.5,
              "& > *": {
                minWidth: {
                  xs: "120px",
                  md: "160px",
                },
              },
            }}
          >
            <FormControl sx={{ flex: 1 }} size="sm">
              <FormLabel>Search for permission</FormLabel>
              <Input
                size="sm"
                placeholder="Search"
                startDecorator={<SearchIcon />}
              />
            </FormControl>
            {renderFilters()}
          </Box>
          <Sheet
            className="OrderTableContainer"
            variant="outlined"
            sx={{
              display: { xs: "none", sm: "initial" },
              width: "100%",
              borderRadius: "sm",
              flexShrink: 1,
              overflow: "auto",
              minHeight: 0,
            }}
          >
            <Table
              aria-labelledby="tableTitle"
              stickyHeader
              hoverRow
              sx={{
                "--TableCell-headBackground":
                  "var(--joy-palette-background-level1)",
                "--Table-headerUnderlineThickness": "1px",
                "--TableRow-hoverBackground":
                  "var(--joy-palette-background-level1)",
                "--TableCell-paddingY": "4px",
                "--TableCell-paddingX": "8px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      width: 48,
                      textAlign: "center",
                      padding: "12px 6px",
                    }}
                  >
                    <Checkbox
                      size="sm"
                      indeterminate={
                        selected.length > 0 && selected.length !== rows.length
                      }
                      checked={selected.length === rows.length}
                      color={
                        selected.length > 0 || selected.length === rows.length
                          ? "primary"
                          : undefined
                      }
                      sx={{ verticalAlign: "text-bottom" }}
                    />
                  </th>
                  <th style={{ width: 140, padding: "12px 6px" }}>Role Name</th>
                  <th style={{ width: 240, padding: "12px 6px" }}>
                    Permission Names
                  </th>
                  <th style={{ width: 140, padding: "12px 6px" }}> </th>
                </tr>
              </thead>
              <tbody>
                {/* {stableSort(rows, getComparator(order, "id")).map((row) => ( */}
                {rows?.data?.map((row: any, index: any) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center", width: 120 }}>
                      <Checkbox
                        size="sm"
                        slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                        sx={{ verticalAlign: "text-bottom" }}
                      />
                    </td>
                    <td>
                      <Typography level="body-xs">{row.role_name}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">
                        {row.permission_names.map(
                          (permission: any, index: number) => (
                            <span key={index}>
                              {permission}
                              {index !== row.permission_names.length - 1 &&
                                ", "}
                            </span>
                          )
                        )}
                      </Typography>
                    </td>
                    <td>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "center",
                          marginTop: "5px",
                        }}
                      >
                        <Button onClick={() => {}} className="bg-black">
                          Edit
                        </Button>
                        <Button
                          onClick={() =>
                            deleteRoleData(row.role_id, row.permission_ids)
                          }
                          className="bg-black"
                          component="button"
                        >
                          Delete
                        </Button>
                        {/* <RowMenu deleteFunction={() => deleteUserData(row.id)} /> */}
                      </Box>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
          <Box
            className="Pagination-laptopUp"
            sx={{
              pt: 2,
              gap: 1,
              [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <Button
              size="sm"
              variant="outlined"
              color="neutral"
              startDecorator={<KeyboardArrowLeftIcon />}
            >
              Previous
            </Button>

            <Box sx={{ flex: 1 }} />
            {["1", "2", "3", "…", "8", "9", "10"].map((page) => (
              <IconButton
                key={page}
                size="sm"
                variant={Number(page) ? "outlined" : "plain"}
                color="neutral"
              >
                {page}
              </IconButton>
            ))}
            <Box sx={{ flex: 1 }} />

            <Button
              size="sm"
              variant="outlined"
              color="neutral"
              endDecorator={<KeyboardArrowRightIcon />}
            >
              Next
            </Button>
          </Box>
        </React.Fragment>
      )}
    </>
  );
}
