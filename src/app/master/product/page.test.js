import React from 'react';
import { render, screen, fireEvent, act, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Breadcrumb } from 'antd';
import { getAPI, postAPI, putAPI } from '@/utils/apiRequest';
import * as reactRedux from 'react-redux';
import Products from '@/app/master/product/page';
import userEvent from '@testing-library/user-event';
import { AddButton, EditButton } from '@/app/components/common/Button';

const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));
jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn((selector) => selector()),
}));

const mockState = {
  userInfo: {
    user: { name: 'Sahil', email: 'sahil@example.com' },
  },
  rightInfo: {
    userModules: [],
    pageRight: [],
  },
  navBarInfo: {
    ACTIVE_PAGE: "MODULE_2-PAGE_23_1_2",
  }
};

jest.spyOn(reactRedux, 'useSelector').mockImplementation((selector) =>
  selector(mockState)
);


jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(jest.fn());

// jest.mock("@/utils/apiRequest", () => ({
//   postAPI: jest.fn(),
//   putAPI: jest.fn()
// }));

// jest.mock("@/utils/common", () => ({
//   displayMessage: jest.fn(),
//   interpolate: jest.fn(),
// }));



beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // for older browsers
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

const mockProducts = [
  {
    id: 4,
    ProductCode: "PRODUCT4",
    ProductName: "product4",
    ProductType: "MAL",
    CompanyCode: "MKD",
    ProductImage: "/products/ProductImage-1750412998553-4.png",
    Weight: 52,
    Mrp: 243,
    UOM: "Kilograms",
    Active: 1,
    Status: 1,
  }, {
    id: 5,
    ProductCode: "PRODUCT5",
    ProductName: "product5",
    ProductType: "IP",
    CompanyCode: "MKD",
    ProductImage: "/products/ProductImage-1750412998553-5.png",
    Weight: 52,
    Mrp: 243,
    UOM: "Kilograms",
    Active: 1,
    Status: 1,
  }
];

const mockProductType = [
  {
    id: 1,
    ProductType: "MAL",
  },
  {
    id: 2,
    ProductType: "IP",
  },
  {
    id: 3,
    ProductType: "Explosives",
  }
]

// jest.mock('@/utils/apiRequest', () => ({
//   postAPI: jest.fn(() =>
//     Promise.resolve({
//       status: 200,
//       data: {
//         docs: mockProducts,
//         totalPages: 1
//       }
//     })
//   ),
//   getAPI: jest.fn(() =>
//     Promise.resolve({
//       status: 200,
//       data: {
//         docs: mockProductType,
//         totalPages: 1
//       }
//     })
//   )
// }));

jest.mock("@/utils/apiRequest", () => ({
  postAPI: jest.fn(),
  getAPI: jest.fn(),
}));

beforeEach(() => {
  postAPI.mockResolvedValue({
    status: 200,
    data: {
      docs: mockProducts,
      totalPages: 1
    }
  });
  getAPI.mockResolvedValue({
    status: 200,
    data: mockProductType,
  });
});
// jest.mock('@/utils/apiRequest', () => ({
//   postAPI: jest.fn((url) => {
//     if (url === '/master/product') {
//       return Promise.resolve({
//         status: 200,
//         data: {
//           docs: mockProducts,
//           totalDocs: mockProducts.length,
//           totalPages: 1,
//         },
//       });
//     }
//     return Promise.resolve({ status: 404 });
//   }),
//   getAPI: jest.fn((url) => {
//     if (url === '/common/PRODUCTTYPE') {
//       return Promise.resolve({
//         status: 200,
//         data: mockProductType,
//       });
//     }
//     return Promise.resolve({ status: 404 });
//   }),
// }));


jest.mock('antd', () => {
  const antd = jest.requireActual('antd');

  return {
    ...antd,
    message: {
      success: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warning: jest.fn(),
      loading: jest.fn(),
    }
  };
});


describe('Products Component', () => {
  it('renders breadcrumb items', () => {
    render(
      <Breadcrumb
        items={[
          { title: 'Master', href: '/master' },
          { title: 'Products', href: '/master/products' },
        ]}
      />
    );

    expect(screen.getByText('Master')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('renders all products in AntD Table', async () => {

    const { container } = render(<Products />);

    await waitFor(() => {
      const rows = container.querySelectorAll('tbody > tr');
      expect(rows.length).toBeGreaterThan(0);
      expect(rows[0].textContent).not.toMatch(/No data/i);
    });

    const rows = container.querySelectorAll('tbody > tr');
    expect(rows.length).toBeGreaterThan(0);


    rows.forEach((row, index) => {
      const product = mockProducts[index];

      const cells = row.querySelectorAll('td');
      expect(cells.length).toBeGreaterThan(0);

      const img = cells[0].querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute(
        'src',
        expect.stringContaining(product.ProductImage)
      );

      expect(cells[1]).toHaveTextContent(new RegExp(product.ProductName, "i"));
      expect(cells[2]).toHaveTextContent(new RegExp(product.ProductCode, "i"));
      expect(cells[3]).toHaveTextContent(new RegExp(product.ProductType, "i"));
      expect(cells[4]).toHaveTextContent(product.Weight.toString());
      expect(cells[5]).toHaveTextContent(product.Mrp.toString());
      expect(cells[6]).toHaveTextContent(new RegExp(product.UOM, "i"));

      const checkbox = cells[7].querySelector('input[type="checkbox"]');
      expect(checkbox).toBeInTheDocument();

      const tag = cells[8].querySelector('.ant-tag');
      expect(tag).toBeInTheDocument();

      const editButton = cells[9]?.querySelector('button');
      if (editButton) {
        expect(editButton).toBeInTheDocument();
      }
    });

  });


  it('searches by products', async () => {
    const user = userEvent.setup();

    const { container } = render(<Products />);

    const selectTrigger = container.querySelector('.ant-select-selector');
    expect(selectTrigger).toBeInTheDocument();

    await user.click(selectTrigger);

    const input = await waitFor(() => {
      return container.querySelector('.ant-select-selector');
    });

    expect(input).toBeInTheDocument();

    await user.type(input, 'product4');

    // Wait for dropdown option
    const option = await screen.findByText('product4');
    expect(option).toBeInTheDocument();
    // Click the option
    await user.click(option);
    await waitFor(() => {
      const tableText = container.textContent;
      expect(tableText).toContain("product4");
      expect(tableText).toContain("PRODUCT4");
      expect(tableText).toContain("MAL");
      expect(tableText).toContain("52");
      expect(screen.getByTestId("selected-name")).toHaveTextContent("product4");
    });
  });


  // it('search by product code', async () => {
  //   const { container } = render(<Products />)
  //   const codeInput = container.querySelector('input[placeholder = "Search Product Code"]')
  //   expect(codeInput).toBeInTheDocument();

  //   await userEvent.type(codeInput, "P0001")
  //   expect(codeInput).toHaveValue("P0001")
  // })

  it("loads and selects a product type from fetched options", async () => {
    const user = userEvent.setup();

    render(<Products />);

    // Find the select trigger by testid
    const selectTrigger = screen.getByTestId("productTypeSelect");
    expect(selectTrigger).toBeInTheDocument();

    // Click the trigger to open dropdown
    await user.click(selectTrigger);

    // Now wait for the dropdown option to appear
    const option = await screen.findByText("MAL");
    expect(option).toBeInTheDocument();

    // Click the option
    await user.click(option);

    // Check that the selected value is visible
    const selectedValue = screen.getByText("MAL");
    expect(selectedValue).toBeInTheDocument();
  });


  // it('navigates to add product form', async () => {
  //   const user = userEvent.setup();

  //   // Clear mockPush
  //   mockPush.mockClear();

  //   const mockState = {
  //     userInfo: {
  //       user: { name: 'Test User', email: 'test@example.com' },
  //     },
  //     rightInfo: {
  //       userModules: [],
  //       pageRight: [],
  //     },
  //     navBarInfo: {
  //       ACTIVE_PAGE: "MODULE_2-PAGE_23_1_2",
  //     }
  //   };

  //   jest.spyOn(reactRedux, 'useSelector').mockImplementation((selector) =>
  //     selector(mockState)
  //   );


  //   render(<Products />);

  //   const addButton = await screen.findByTestId('add-product-btn');
  //   expect(addButton).toBeInTheDocument();

  //   await user.click(addButton);

  //   expect(mockPush).toHaveBeenCalledWith('/master/products/add');
  // });
  // it('navigates to add product form', async () => {
  //   const user = userEvent.setup();
  //   render(<Products />);

  //   screen.debug();

  //   const addButton = screen.getByTestId('add-product-btn');
  //   expect(addButton).toBeInTheDocument();

  //   await user.click(addButton);
  //   expect(mockPush).toHaveBeenCalledWith('/master/product/add');
  // });

  it("renders nothing if no permission", () => {
    render(<AddButton hasPermission={false} text="Add new product" />);
    expect(screen.queryByText("Add new product")).not.toBeInTheDocument();
  });
  it("renders nothing if no permission", () => {
    render(<EditButton hasPermission={false} text="Add new product" />);
    expect(screen.queryByText("Add new product")).not.toBeInTheDocument();
  });
  // it("renders button if has permission", () => {
  //   render(<AddButton hasPermission={true} text="Add new product" />);
  //   expect(screen.getByRole("button", { name: /add new product/i })).toBeInTheDocument();
  // });

  // it("renders AddButton and clicks it by text", async () => {
  //   const user = userEvent.setup();
  //   const mockFn = jest.fn();

  //   render(
  //     <AddButton
  //       text="Add new product"
  //       _function={mockFn}
  //       hasPermission={true}
  //     />
  //   );

  //   // Find by text
  //   const btn = screen.getByRole("button", { name: /add new product/i });


  //   console.log("Button element:", btn);
  //   console.log("Button textContent:", btn.textContent);

  //   expect(btn).toBeInTheDocument();

  //   await user.click(btn);
  //   expect(mockFn).toHaveBeenCalled();

  // });
});
