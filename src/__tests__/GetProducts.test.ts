import createMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fetchProducts } from "../redux/products/action";
import exp from "node:constants";

const middlewares = [thunk];
const mockStore = createMockStore(middlewares);
const initialState = {
  loading: false,
  data: [],
};

const productList = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description: "Nice backpack to fit laptops",
    category: "Mens Clothing",
    image: "",
    rating: {
      rate: 3.5,
      count: 120,
    },
  },
];

describe("Test product list actions", () => {
  let store: any;

  beforeEach(() => {
    const mockedResponse = {
      json: jest.fn().mockResolvedValueOnce(productList),
    };
    global.fetch = jest.fn().mockResolvedValueOnce(mockedResponse);

    store = mockStore(initialState);
  });

  afterEach(() => {
    jest.restoreAllMocks;
  });

  it("should execute fetchdata", async () => {
    const expectedActions = [
      "@@product/FETCH_SUCCESS",
      "@@product/FETCH_FAILURE",
    ];
    await store.dispatch(fetchProducts());
    const actualAction = store.getActions()[0]?.type;
    expect(actualAction).toEqual(expectedActions[0]);
  });
});
