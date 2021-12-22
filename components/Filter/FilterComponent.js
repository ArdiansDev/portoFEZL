/* This example requires Tailwind CSS v2.0+ */
import { FilterIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { isArray } from 'lodash';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function FilterComponent({ updateFormData, formData }) {
  const handleChange = (e, submenu, subSubMenu, value) => {
    console.log(e.target.getAttribute('name'));
    const newForm = formData.map((itm) => {
      if (itm.title == e.target.getAttribute('name')) {
        let index = itm.submenu
          .map(function (e) {
            return e.title;
          })
          .indexOf(submenu);
        if (index == 0) {
          itm.submenu.map((subItm) => {
            subItm.selected = false;
            if (subItm.submenu && subItm.submenu.length > 0) {
              subItm.submenu.map((subSubItm, k) => {
                subSubItm.selected = false;
                return subItm;
              });
            }
            return subItm;
          });
          itm.submenu[0].selected = true;
        } else {
          itm.submenu.map((subItm) => {
            if (subSubMenu && subItm.submenu && subItm.submenu.length > 0) {
              let subIndex = subItm.submenu
                .map(function (e) {
                  return e.title;
                })
                .indexOf(subSubMenu);
              if (subIndex == 0) {
                if (subItm.title === submenu) {
                  subItm.submenu.map((subSubItm, k) => {
                    if (k == 0) {
                      subSubItm.selected = true;
                    } else {
                      subSubItm.selected = false;
                    }
                    return subSubItm;
                  });
                  subItm.selected = true;

                  subItm.submenu[0].selected = true;
                  itm.submenu[0].selected = false;
                }
                return subItm;
              } else {
                if (subItm.title == submenu) {
                  subItm.submenu.map((subSubItm) => {
                    if (subSubItm.title == subSubMenu) {
                      subSubItm.selected = subSubItm.selected ? false : true;
                    }
                    return subSubItm;
                  });
                  let got_selected = subItm.submenu.find((filter, j) => {
                    return filter.selected && j != 0;
                  });
                  if (got_selected) {
                    subItm.selected = true;
                    itm.submenu[0].selected = false;
                  } else {
                    subItm.selected = true;
                    subItm.submenu[0].selected = true;

                    return subItm;
                  }
                }
                subItm.submenu[0].selected = false;

                return subItm;
              }
            } else {
              switch (e.target.getAttribute('name')) {
                case 'Department/Position':
                  if (subItm.title == submenu) {
                    subItm.selected = subItm.selected ? false : true;
                  } else {
                    subItm.selected = false;
                  }
                  if (subItm.submenu && subItm.submenu.length > 0) {
                    subItm.submenu.map((subSubItm) => {
                      subSubItm.selected = false;

                      return subSubItm;
                    });
                  }
                  break;
                default:
                  if (subItm.title == submenu) {
                    subItm.selected = subItm.selected ? false : true;
                  }
                  break;
              }

              let subMenu_selected = itm.submenu.find((filter, i) => {
                return filter.selected && i != 0;
              });
              if (subMenu_selected) {
                itm.submenu[0].selected = false;
              } else {
                itm.submenu[0].selected = true;

                return itm;
              }
              itm.submenu[0].selected = false;
            }
            return subItm;
          });
        }
      }
      return itm;
    });
    updateFormData(newForm);
  };
  return (
    <div className="group inline-block">
      <button className="outline-none focus:outline-none py-1 mr-2 flex items-center">
        <FilterIcon className=" h-5 w-5  text-blue-900" aria-hidden="true" />
        <a className="text-blue-900 pl-2">Filter</a>
      </button>
      <ul
        className="bg-white border rounded-md transform scale-0 group-hover:scale-100 absolute 
    transition duration-150 ease-in-out origin-top min-w-32"
      >
        {formData.map((item) => {
          const menu = item.title;
          const selectedItm = item.submenu.filter((itm) => {
            return itm.selected == true;
          });
          return (
            <li className="rounded-md relative px-3 py-2 hover:bg-blue-100">
              <button className="w-full text-left flex items-center outline-none focus:outline-none">
                <span className="pr-1 flex-1 text-gray-700">{menu}</span>
                <span className="mr-auto">
                  <ChevronRightIcon
                    className=" pl-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </button>
              <ul className="bg-white border rounded-md absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left min-w-32">
                {item.submenu &&
                  item.submenu.length > 1 &&
                  item.submenu.map((subItem) => {
                    const subMenu = subItem.title;
                    let checked = subItem.selected ? true : false;
                    const has_subItem =
                      isArray(subItem.submenu) && subItem.submenu.length > 1
                        ? true
                        : false;
                    return (
                      <li className="rounded-md relative px-3 py-2 hover:bg-blue-100">
                        {has_subItem ? (
                          <button className="w-full text-left flex items-center outline-none focus:outline-none">
                            <span className="pr-1 flex-1 text-gray-700">
                              {subMenu}
                            </span>
                            <span className="mr-auto">
                              <ChevronRightIcon
                                className=" pl-1 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </button>
                        ) : (
                          <button
                            value={menu}
                            onClick={(e = value) =>
                              handleChange(e, subMenu, null)
                            }
                            className="w-full text-left flex items-center justify-between outline-none focus:outline-none"
                          >
                            <span
                              name={menu}
                              className="pr-1 flex-1 text-gray-700"
                            >
                              {subMenu}
                            </span>
                            <input
                              type="checkbox"
                              // onChange={(e) => handleChange(e, subMenu, null)}
                              name={menu}
                              checked={checked}
                              class=" rounded-md border-gray-300	"
                            />
                          </button>
                        )}
                        {subItem.submenu && subItem.submenu.length > 1 && (
                          <ul className="bg-white border rounded-md absolute top-0 right-0  min-w-32 ">
                            {subItem.submenu &&
                              subItem.submenu.length > 1 &&
                              subItem.submenu.map((subSubItem, index) => {
                                const subSubMenu = subSubItem.title;
                                let checked = subSubItem.selected
                                  ? true
                                  : false;

                                // let isNotAll = subItem.submenu
                                //   .filter((menu) => menu.id !== 'all')
                                //   .some((menu) => menu.selected);
                                // if (index === 0) {
                                //   checked = isNotAll ? false : true;
                                // }

                                return (
                                  <li className="px-3 py-1 hover:bg-blue-100">
                                    <button
                                      onClick={(e = value) =>
                                        handleChange(e, subMenu, subSubMenu)
                                      }
                                      className="w-full text-left flex items-center outline-none focus:outline-none"
                                    >
                                      <span
                                        name={menu}
                                        className="pr-1 flex-1 text-gray-700"
                                      >
                                        {subSubMenu}
                                      </span>
                                      <input
                                        type="checkbox"
                                        onChange={(e) =>
                                          handleChange(e, subMenu, subSubMenu)
                                        }
                                        name={menu}
                                        checked={checked}
                                        class=" rounded-md border-gray-300	"
                                      />
                                    </button>
                                  </li>
                                );
                              })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
