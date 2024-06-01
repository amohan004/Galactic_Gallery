import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import MediaLibrary from "./MediaLibrary";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@testing-library/jest-dom/extend-expect";

// import "@testing-library/jest-dom/extend-expect";

const mockAxios = new MockAdapter(axios);
const queryClient = new QueryClient();

const theme = createTheme();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>{ui}</Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe("MediaLibrary Component", () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  test("renders the component and handles search", async () => {
    mockAxios.onGet("http://localhost:3001/search").reply(200, [
      {
        href: "http://example.com/image.jpg",
        data: [
          {
            center: "NASA",
            title: "Test Image",
            keywords: ["test"],
            nasa_id: "12345",
            date_created: "2021-01-01T00:00:00Z",
            media_type: "image",
            description: "Test description",
          },
        ],
        links: [
          {
            href: "http://example.com/image.jpg",
            rel: "preview",
          },
        ],
      },
    ]);

    renderWithProviders(<MediaLibrary />);

    // Check if the MediaFilter component is rendered
    expect(screen.getByText(/Search query is required/i)).toBeInTheDocument();

    // Simulate entering a search query
    fireEvent.change(screen.getByLabelText(/search/i), {
      target: { value: "test" },
    });
    // fireEvent.click(screen.getByText(/Search/i));
    fireEvent.click(screen.getByRole("button", { name: /Search/i }));

    // Wait for the axios request to complete and UI to update
    await waitFor(() => expect(mockAxios.history.get.length).toBe(1));

    // Check if the image is rendered
    expect(screen.getByAltText("Test Image")).toBeInTheDocument();
  });

  test('displays "No matching results found" when there are no results', async () => {
    mockAxios.onGet("http://localhost:3001/search").reply(200, []);

    renderWithProviders(<MediaLibrary />);

    // Simulate entering a search query
    fireEvent.change(screen.getByLabelText(/search/i), {
      target: { value: "nonexistent" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Search/i }));

    // Wait for the axios request to complete and UI to update
    await waitFor(() => expect(mockAxios.history.get.length).toBe(1));

    // Check if the "No matching results found" message is displayed
    expect(screen.getByText(/No matching results found/i)).toBeInTheDocument();
  });

  test("displays error message on request failure", async () => {
    mockAxios.onGet("http://localhost:3001/search").reply(500);

    renderWithProviders(<MediaLibrary />);

    // Simulate entering a search query
    fireEvent.change(screen.getByLabelText(/search/i), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Search/i }));

    // Wait for the axios request to complete and UI to update
    await waitFor(() => expect(mockAxios.history.get.length).toBe(1));

    // Check if the "Something went wrong" message is displayed
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
