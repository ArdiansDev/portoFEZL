/* This example requires Tailwind CSS v2.0+ */
import FilterComponent from './FilterComponent';
import { XIcon } from '@heroicons/react/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Filter({ filterData, changeFilterData, resetFilter }) {
  //example

  const handleChange = (menu) => {
    const newForm = filterData.map((itm) => {
      if (itm.title == menu) {
        itm.submenu.map((subItm, index) => {
          if (index == 0) {
            subItm.selected = true;
          } else {
            subItm.selected = false;
            if (subItm.submenu && subItm.submenu.length > 0) {
              subItm.submenu.map((subSubMenu) => {
                subSubMenu.selected = false;
                return subSubMenu;
              });
            }
          }

          return subItm;
        });
      }
      return itm;
    });
    changeFilterData(newForm);
  };

  return (
    <div className="flex items-start mobile:flex-col	 ">
      <FilterComponent
        updateFormData={changeFilterData}
        formData={filterData}
      />
      <div className="flex flex-wrap">
        {filterData.map((item) => {
          let subMenu = [];
          let total_selected = item.submenu.filter(
            (menu, i) => menu.selected && i != 0
          );
          item.submenu.map((subItm, index) => {
            if (subItm.selected) {
              // console.log(subItm);
              let subSubMenu = [];
              if (subItm.submenu && subItm.submenu.length > 0) {
                subItm.submenu.filter((subSubItm) => {
                  if (subSubItm.selected) {
                    // x_icon = subItm.selected && index != 0;
                    subSubMenu.push(subSubItm.title);
                  }
                });
                subItm;
              }
              subMenu.push({ subItm, subSubMenu });
            }
          });

          return (
            <div className=" flex  mx-1 my-1  items-center 	">
              <div className="bg-gray-200  text-sm text-gray-600 rounded-full py-0.5 px-2 font-semibold flex">
                {item.title} :
                {subMenu.map((sm) => {
                  const { subItm, subSubMenu } = sm;
                  return (
                    <span className="text-sm text-gray-800 font-normal flex pl-1">
                      {subItm.title}
                      {subSubMenu && subSubMenu.length > 0
                        ? '(' + subSubMenu.join(', ') + '), '
                        : subMenu.length > 1
                        ? ','
                        : ''}
                    </span>
                  );
                })}
              </div>
              {total_selected.length > 0 && (
                <XIcon
                  className="cursor-pointer h-5 w-5 text-gray-400"
                  aria-hidden="true"
                  onClick={() => handleChange(item.title)}
                />
              )}
            </div>
          );
        })}
      </div>
      <button
        className=" flex h-8 mx-2 px-2 py-2 items-center rounded-full min-width-100	"
        onClick={resetFilter}
      >
        <a className="font-bold text-sm text-blue-800">Reset Filter</a>
      </button>
    </div>
  );
}
