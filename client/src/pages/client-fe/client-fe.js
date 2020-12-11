import React, { useEffect, useRef, useState } from "react";
import { useApiCall } from "hooks/use-api-call";
import { fetchBuilds } from "./apis/get-builds.api";
import MainHeader from "components/typography/main-header";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { BuildStatusIcon } from "./components/build-status-icon";
import { BUILD_STATUS_MAP } from "./client-fe.constants";
import RebuildBtn from "pages/client-fe/components/rebuild-btn";
import InlineLoader from "components/loader/inline-loader";
import { cancelBuild } from "./apis/cancel-build.api";

const ClientFE = () => {
  const interval = useRef();
  const loadingRef = useRef(false);
  const [lastTimeUpdated, setLastTimeUpdated] = useState("");
  const { data, trigger, loading } = useApiCall({
    fetcher: fetchBuilds,
    initData: [],
    onSuccess: () => {
      setLastTimeUpdated(new Date().toLocaleTimeString());
    },
  });
  loadingRef.current = loading;
  const refetchBuildsList = async () => {
    if (!loadingRef.current) {
      // poll if not loading
      await trigger();
    }
  };

  const { trigger: cancelBuildTrigger } = useApiCall({
    fetcher: cancelBuild,
    onSuccess: () => {
      refetchBuildsList();
    },
  });

  useEffect(() => {
    refetchBuildsList();
    interval.current = setInterval(async () => {
      refetchBuildsList();
    }, 5000);
    return () => {
      clearInterval(interval.current);
    };
  }, [setLastTimeUpdated]);

  return (
    <div>
      <MainHeader>Перестройка сайта</MainHeader>
      <RebuildBtn
        onSuccess={() => {
          trigger();
        }}
      />
      <Box my={3}>
        <Typography variant="h6">
          Последние 5 сборок :
          <InlineLoader loading={loading} />
        </Typography>
        <Typography>Последнее обновление данных: {lastTimeUpdated}</Typography>
      </Box>
      <List>
        {data.map((build) => (
          <ListItem key={build.uid}>
            <ListItemAvatar>
              <BuildStatusIcon status={build.state} />
            </ListItemAvatar>

            <ListItemText
              primary={new Intl.DateTimeFormat("ru-Ru", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: false,
              }).format(build.created)}
            />
            {(build.state === BUILD_STATUS_MAP.building ||
              build.state === BUILD_STATUS_MAP.queued) && (
              <ListItemSecondaryAction>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => cancelBuildTrigger({ id: build.uid })}
                >
                  Отменить
                </Button>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ClientFE;
