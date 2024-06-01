import { Grid, TextField, Button, MenuItem } from "@mui/material";
import { useStyles } from "./styles";

interface MediaFilterProps {
  handleChange: (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => void;
  refetchWithFilters: () => void;
  filters: Filters;
  isSearchEmpty: boolean;
}

interface Filters {
  q: string;
  yearStart: string;
  yearEnd: string;
  mediaType: string;
}

const MediaFilter: React.FC<MediaFilterProps> = ({
  handleChange,
  filters,
  isSearchEmpty,
  refetchWithFilters,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.filtersContainer}>
      <form className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search Query"
              name="q"
              value={filters.q}
              onChange={handleChange}
              required
              error={isSearchEmpty}
              helperText={isSearchEmpty ? "Search query is required" : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              type="date"
              label="Year Start"
              InputLabelProps={{ shrink: true }}
              name="yearStart"
              value={filters.yearStart}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              type="date"
              label="Year End"
              InputLabelProps={{ shrink: true }}
              name="yearEnd"
              value={filters.yearEnd}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              variant="outlined"
              label="Media Type"
              name="mediaType"
              value={filters.mediaType}
              onChange={handleChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="image">Images</MenuItem>
              {/* <MenuItem value="video">Videos</MenuItem> */}
            </TextField>
          </Grid>
          <Grid item xs={12} className={classes.buttonGrid}>
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={refetchWithFilters}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
export default MediaFilter;
