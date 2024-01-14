"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import * as React from "react";
// icons
import Modal from "@/components/common/Modal";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import { CircularProgress } from "@mui/joy";
import { ModelType } from "@prisma/client";
import useSWR from "swr";
import UpdateAssignPermission from "./AssignPermissionUpdateForm";

export default function AssignPermissionTable({
  isFormSubmitted,
  resetFormSubmissionStatus,
}: {
  isFormSubmitted?: boolean;
  resetFormSubmissionStatus?: any;
}) {
  const [openAssignPermission, setOpenAssignPermission] = React.useState(false);
  const [dataUpdated, setDataUpdated] = React.useState(false);

  const handleDataUpdate = () => {
    setDataUpdated(true);
    setOpenAssignPermission(false);
  };

  const fetchUrl = "/api/authorization/model-has-permission";

  const fetcher = (url: any) => fetch(url).then((res) => res.json());

  // Use swr to fetch and cache data
  const { data: rows, isLoading, mutate } = useSWR(fetchUrl, fetcher);

  // React.useEffect is used to revalidate data when isFormSubmitted changes
  React.useEffect(() => {
    if (isFormSubmitted || !openAssignPermission) {
      // Revalidate (refetch) the data
      mutate();
      resetFormSubmissionStatus();
    }
  }, [isFormSubmitted, resetFormSubmissionStatus, openAssignPermission]);

  const deleteUserData = async (id: string) => {
    if (confirm("Are you sure you want to delete?")) {
      const response = await fetch(fetchUrl, {
        method: "DELETE",
        body: JSON.stringify({ id, model_type: ModelType.USER }),
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

            <IconButton size="sm" variant="outlined" color="neutral">
              <FilterAltIcon />
            </IconButton>
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
                    <Checkbox size="sm" sx={{ verticalAlign: "text-bottom" }} />
                  </th>
                  <th style={{ width: 140, padding: "12px 6px" }}>
                    User email
                  </th>
                  <th style={{ width: 240, padding: "12px 6px" }}>
                    Permission Name
                  </th>
                  <th style={{ width: 140, padding: "12px 6px" }}> </th>
                </tr>
              </thead>
              <tbody>
                {/* {stableSort(rows, getComparator(order, "id")).map((row) => ( */}
                {rows.data.map((row: any, index: any) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center", width: 120 }}>
                      <Checkbox
                        size="sm"
                        slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                        sx={{ verticalAlign: "text-bottom" }}
                      />
                    </td>
                    <td>
                      <Typography level="body-xs">{row.model_email}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">
                        {row.permission_names.map(
                          (permission_name: string, index: number) => (
                            <span key={index}>
                              {permission_name}
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
                        <Modal
                          open={openAssignPermission}
                          setOpen={setOpenAssignPermission}
                        >
                          {openAssignPermission}
                          <UpdateAssignPermission
                            onSubmitSuccess={handleDataUpdate}
                            model_id={row.model_id}
                            model_email={row.model_email}
                          />
                        </Modal>
                        <Button
                          onClick={() => setOpenAssignPermission(true)}
                          className="bg-black"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteUserData(row.model_id)}
                          className="bg-black"
                          component="button"
                        >
                          Delete
                        </Button>
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
