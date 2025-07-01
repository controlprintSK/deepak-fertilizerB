import React from 'react';
import { render, screen, fireEvent, act, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Breadcrumb } from 'antd';
import { postAPI, putAPI } from '@/utils/apiRequest';
import * as reactRedux from 'react-redux';
import Products from '@/app/master/product/page';
import userEvent from '@testing-library/user-event';

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
    ProductType: "MAL",
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

jest.mock('@/utils/apiRequest', () => ({
  postAPI: jest.fn(() =>
    Promise.resolve({
      status: 200,
      data: {
        docs: mockProducts,
        totalPages: 1
      }
    })
  )
}));


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


  //   it('search by product code', async () => {
  //     const { container } = render(<Products />)
  //     const codeInput = container.querySelector('input[placeholder = "Search Product Code"]')
  //     expect(codeInput).toBeInTheDocument();

  //     await userEvent.type(codeInput, "P0001")
  //     expect(codeInput).toHaveValue("P0001")
  //   })

  //   it('Select by product type', async () => {
  //     const { container } = render(<Products />);

  //     const selectTrigger = container.querySelector('.ant-select-selector');
  //     expect(selectTrigger).toBeInTheDocument();
  //     fireEvent.mouseDown(selectTrigger);

  //     const option = await screen.findByTitle('MAL');
  //     expect(option).toBeInTheDocument();
  //     fireEvent.click(option);

  //     const selectedValue = container.querySelector('.ant-select-selection-item');
  //     expect(selectedValue).toHaveTextContent('MAL');

  //   })

  //   it('Navigate to add product form',async()=>{
  //     const user = userEvent.setup();
  //     render(<Products/>)
  //     const addProduct = screen.getByRole('button', { name: /add product/i })
  //     expect(addProduct).toBeInTheDocument();

  //     await user.click(addProduct)
  //     expect(mockPush).toHaveBeenCalledWith('/master/products/add')
  //   })

});
