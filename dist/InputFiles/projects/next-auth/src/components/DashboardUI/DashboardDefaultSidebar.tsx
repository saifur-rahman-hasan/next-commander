"use client";

import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import GlobalStyles from "@mui/joy/GlobalStyles";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import LinearProgress from "@mui/joy/LinearProgress";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import * as React from "react";

import ColorSchemeToggle from "@/components/DashboardUI/ColorSchemeToggle";
import { DashboardLogoutIconButton } from "@/components/buttons.component";
import useAuth from "@/hooks/useAuth";
import { closeSidebar } from "@/utils/toggleSidebar";
import { CssVarsProvider } from "@mui/joy/styles";
import { CircularProgress } from "@mui/material";
import Link from "next/link";

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);

  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function DashboardDefaultSidebar() {
  const { user } = useAuth();
  return (
    <CssVarsProvider disableTransitionOnChange>
      <Sheet
        className="Sidebar"
        sx={{
          position: {
            xs: "fixed",
            md: "sticky",
          },
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
            md: "none",
          },
          transition: "transform 0.4s, width 0.4s",
          zIndex: 10000,
          height: "100dvh",
          width: "var(--Sidebar-width)",
          top: 0,
          p: 2,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        <GlobalStyles
          styles={(theme) => ({
            ":root": {
              "--Sidebar-width": "220px",
              [theme.breakpoints.up("lg")]: {
                "--Sidebar-width": "240px",
              },
            },
          })}
        />
        <Box
          className="Sidebar-overlay"
          sx={{
            position: "fixed",
            zIndex: 9998,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            opacity: "var(--SideNavigation-slideIn)",
            backgroundColor: "var(--joy-palette-background-backdrop)",
            transition: "opacity 0.4s",
            transform: {
              xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
              lg: "translateX(-100%)",
            },
          }}
          onClick={() => closeSidebar()}
        />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <IconButton variant="soft" color="primary" size="sm">
            <BrightnessAutoRoundedIcon />
          </IconButton>
          <Typography level="title-lg">Acme Co.</Typography>
          <ColorSchemeToggle sx={{ ml: "auto" }} />
        </Box>
        <Input
          size="sm"
          startDecorator={<SearchRoundedIcon />}
          placeholder="Search"
        />
        <Box
          sx={{
            minHeight: 0,
            overflow: "hidden auto",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            [`& .${listItemButtonClasses.root}`]: {
              gap: 1.5,
            },
          }}
        >
          <List
            size="sm"
            sx={{
              gap: 1,
              "--List-nestedInsetStart": "30px",
              "--ListItem-radius": (theme) => theme.vars.radius.sm,
            }}
          >
            <ListItem>
              <ListItemButton>
                <HomeRoundedIcon />
                <ListItemContent>
                <Link href={`/home`}>
                  <Typography level="title-sm">Home</Typography>
                </Link>
                </ListItemContent>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton>
                <DashboardRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Dashboard</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>

            <ListItem nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton onClick={() => setOpen(!open)}>
                    <AssignmentRoundedIcon />
                    <ListItemContent>
                      <Typography level="title-sm">User Manager</Typography>
                    </ListItemContent>
                    <KeyboardArrowDownIcon
                      sx={{ transform: open ? "rotate(180deg)" : "none" }}
                    />
                  </ListItemButton>
                )}
              >
                <List sx={{ gap: 0.5 }}>
                  <ListItem sx={{ mt: 0.5 }}>
                    <ListItemButton>
                      <Link href={`/dashboard/userManager/users`}>
                        All Users
                      </Link>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>
                      <Link href={`/dashboard/userManager/users/create`}>
                        Add New User
                      </Link>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>
                      <Link href={`/dashboard/userManager/roles-permissions`}>
                        Manage Roles & permission
                      </Link>
                    </ListItemButton>
                  </ListItem>

                  <ListItem>
                    <ListItemButton>
                      <Link
                        href={`/dashboard/userManager/assign-roles-permissions`}
                      >
                        Assign Roles & permission
                      </Link>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Toggler>
            </ListItem>

              <ListItem nested>
                  <Toggler
                      renderToggle={({ open, setOpen }) => (
                          <ListItemButton onClick={() => setOpen(!open)}>
                              <AssignmentRoundedIcon />
                              <ListItemContent>
                                  <Typography level="title-sm">Product & Pricing</Typography>
                              </ListItemContent>
                              <KeyboardArrowDownIcon
                                  sx={{ transform: open ? "rotate(180deg)" : "none" }}
                              />
                          </ListItemButton>
                      )}
                  >
                      <List sx={{ gap: 0.5 }}>
                          <ListItem sx={{ mt: 0.5 }}>
                              <ListItemButton>
                                  <Link href={`/dashboard/productPricing/products`}>
                                      Products
                                  </Link>
                              </ListItemButton>
                          </ListItem>
                          <ListItem>
                              <ListItemButton>
                                  <Link href={`/dashboard/productPricing/packages`}>
                                      Packages
                                  </Link>
                              </ListItemButton>
                          </ListItem>
                          <ListItem>
                              <ListItemButton>
                                  <Link href={`/dashboard/productPricing/pricing`}>
                                      Pricing
                                  </Link>
                              </ListItemButton>
                          </ListItem>
                      </List>
                  </Toggler>
              </ListItem>

            <ListItem>
              <ListItemButton
                role="menuitem"
                component="a"
                href="/joy-ui/getting-started/templates/messages/"
              >
                <QuestionAnswerRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Messages</Typography>
                </ListItemContent>
                <Chip size="sm" color="primary" variant="solid">
                  4
                </Chip>
              </ListItemButton>
            </ListItem>
          </List>

          <List
            size="sm"
            sx={{
              mt: "auto",
              flexGrow: 0,
              "--ListItem-radius": (theme) => theme.vars.radius.sm,
              "--List-gap": "8px",
              mb: 2,
            }}
          >
            <ListItem>
              <ListItemButton>
                <SupportRoundedIcon />
                Support
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <SettingsRoundedIcon />
                Settings
              </ListItemButton>
            </ListItem>
          </List>
          <Card
            invertedColors
            variant="soft"
            color="warning"
            size="sm"
            sx={{ boxShadow: "none" }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography level="title-sm">Used space</Typography>
              <IconButton size="sm">
                <CloseRoundedIcon />
              </IconButton>
            </Stack>
            <Typography level="body-xs">
              Your team has used 80% of your available space. Need more?
            </Typography>
            <LinearProgress
              variant="outlined"
              value={80}
              determinate
              sx={{ my: 1 }}
            />
            <Button size="sm" variant="solid">
              Upgrade plan
            </Button>
          </Card>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {!user && <CircularProgress size={20} />}

          {user && (
            <>
              <Avatar
                variant="outlined"
                size="sm"
                src={`${
                  user.image
                    ? user.image
                    : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                }`}
              />
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography level="title-sm">{user.name}</Typography>
                <Typography level="body-xs">{user.email}</Typography>
              </Box>
            </>
          )}

          <DashboardLogoutIconButton />
        </Box>
      </Sheet>
    </CssVarsProvider>
  );
}
