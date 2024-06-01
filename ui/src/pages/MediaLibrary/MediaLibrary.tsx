import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Skeleton } from "@mui/material";
import { useStyles } from "./styles";
import { useQuery } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import MediaFilter from "./MediaFilter";

const MediaLibrary: React.FC = () => {
  interface MediaData {
    center: string;
    title: string;
    keywords: string[];
    nasa_id: string;
    date_created: string;
    media_type: string;
    description: string;
  }

  interface Link {
    href: string;
    rel: string;
    render?: string;
  }

  interface NasaMedia {
    href: string;
    data: MediaData[];
    links: Link[];
  }

  interface Filters {
    q: string;
    yearStart: string;
    yearEnd: string;
    mediaType: string;
  }

  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<Filters>({
    q: "",
    yearStart: "",
    yearEnd: "",
    mediaType: "",
  });
  const [filteredImages, setFilteredImages] = useState<NasaMedia[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false);

  const fetchMediaData = async (searchQuery: string): Promise<NasaMedia[]> => {
    try {
      const response = await axios.get("http://localhost:3001/search", {
        params: { q: searchQuery },
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status >= 500) {
        throw error; // Throw the error to be caught by react-query
      }
      throw error; // Re-throw the error if it's not specifically a 5xx error
    }
  };

  const isSearchEmpty = filters.q === "";

  const { isRefetching, isError, refetch } = useQuery<NasaMedia[], Error>(
    ["mediaData", filters.q || location?.state?.q],
    () => fetchMediaData(filters.q || location?.state?.q),
    {
      enabled: false,
      onSuccess: (data) => {
        const filteredMedia = applyFilters(data);
        setFilteredImages(filteredMedia);
        setIsLoading(false);
      },
      retry: false,
    }
  );

  const refetchWithFilters = async () => {
    if (!isSearchEmpty || !isEmpty(location?.state?.q)) {
      setIsLoading(true);
      await refetch();
    }
  };

  const applyFilters = (mediaCollection: NasaMedia[]): NasaMedia[] => {
    return mediaCollection.filter((media: NasaMedia) => {
      const date = new Date(media.data[0].date_created);
      return (
        (!filters.yearStart || date >= new Date(filters.yearStart)) &&
        (!filters.yearEnd || date <= new Date(filters.yearEnd)) &&
        (!filters.mediaType || media.data[0].media_type === filters.mediaType)
      );
    });
  };

  useEffect(() => {
    if (!isEmpty(location.state)) {
      setFilters({
        q: location.state.q || "",
        yearStart: location.state.yearStart || "",
        yearEnd: location.state.yearEnd || "",
        mediaType: location.state.mediaType || "",
      });
      refetchWithFilters();
      navigate(location.pathname, { state: {}, replace: true });
    }
  }, [location]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setIsSubmitClicked(false);
  };

  const fakeSkeletonData = new Array(12).fill(0);

  const renderSkeleton = (index: number) => {
    return (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        key={index}
        className={classes.imageItemSkeleton}
      >
        <Skeleton variant="rectangular" width={"100%"} height={210} />
        {/* <Skeleton variant="text" width={"80%"} />
        <Skeleton variant="text" width={"60%"} /> */}
      </Grid>
    );
  };

  const onSubmit = () => {
    refetchWithFilters();
    setIsSubmitClicked(true);
  };

  const renderImage = (index: number, media: NasaMedia) => {
    const encodedTitle = encodeURIComponent(media?.data?.[0].title || "");
    const encodedDescription = encodeURIComponent(
      media?.data?.[0].description || ""
    );
    const encodedImageUrl = encodeURIComponent(media?.links?.[0].href || "");
    return (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        key={index}
        className={classes.imageItem}
      >
        <Link
          state={{
            q: filters.q,
            yearStart: filters.yearStart,
            yearEnd: filters.yearEnd,
            mediaType: filters.mediaType,
          }}
          to={`/details/${media.data[0].nasa_id}?title=${encodedTitle}&description=${encodedDescription}&imageUrl=${encodedImageUrl}`}
        >
          <img
            src={media.links[0].href}
            alt={media.data[0].title}
            className={classes.image}
          />
        </Link>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <MediaFilter
        filters={filters}
        handleChange={handleChange}
        refetchWithFilters={onSubmit}
        isSearchEmpty={isSearchEmpty}
      />
      <div className={classes.imageContainer}>
        <Grid container spacing={2} className={classes.imageGrid}>
          {isError ? (
            <div className={classes.paragraphContainer}>
              <p>Something went wrong</p>
            </div>
          ) : isRefetching || isLoading ? (
            fakeSkeletonData.map((__, index) => renderSkeleton(index))
          ) : !isSearchEmpty &&
            isSubmitClicked &&
            filteredImages?.length === 0 ? (
            <div className={classes.paragraphContainer}>
              <p className={classes.centeredText}>No matching results found</p>
            </div>
          ) : (
            filteredImages?.map((media: NasaMedia, index) => {
              return media.links?.[0] && renderImage(index, media);
            })
          )}
        </Grid>
      </div>
    </div>
  );
};

export default MediaLibrary;
