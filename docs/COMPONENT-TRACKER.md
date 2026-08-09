# Component adaptation tracker

This table tracks the requested component surface against native HTML compositions. The machine-readable contract map is [`recipes/component-contracts.json`](../recipes/component-contracts.json). It documents composition guidance, not a second component CSS API.

| # | Component | Local source reference | Native-first composition | Status |
| ---: | --- | --- | --- | --- |
| 1 | Accordion | `ui/accordion.tsx` | `details` + `summary` | CSS complete |
| 2 | Alert | `ui/alert.tsx` | labelled `aside`/status surface | CSS complete |
| 3 | Alert Dialog | `ui/alert-dialog.tsx` | native `dialog` + `form method=dialog` | CSS complete |
| 4 | Aspect Ratio | `ui/aspect-ratio.tsx` | CSS `aspect-ratio` frame | CSS complete |
| 5 | Attachment | `ui/attachment.tsx` | labelled `input[type=file]` | CSS complete |
| 6 | Avatar | `ui/avatar.tsx` | labelled initials/image fallback | CSS complete |
| 7 | Badge | `ui/badge.tsx` | text `span` with tone | CSS complete |
| 8 | Breadcrumb | `ui/breadcrumb.tsx` | labelled `nav` + ordered links | Done |
| 9 | Bubble | `ui/bubble.tsx` | message article + avatar + time | Done |
| 10 | Button | `ui/button.tsx` | native `button` + `data-variant` | Done |
| 11 | Button Group | `ui/button-group.tsx` | grouped native buttons | Done |
| 12 | Calendar | `ui/calendar.tsx` | native `input[type=date]` | Done |
| 13 | Card | `ui/card.tsx` | `article`/section surface | Done |
| 14 | Carousel | `ui/carousel.tsx` | horizontal scroll + scroll snap | Done |
| 15 | Chart | `ui/chart.tsx` | semantic figure + labelled data list | Done |
| 16 | Checkbox | `ui/checkbox.tsx` | native checkbox + visible label | Done |
| 17 | Collapsible | `ui/collapsible.tsx` | `details` + `summary` | Done |
| 18 | Combobox | `ui/combobox.tsx` | input + `datalist` enhancement hook | Done |
| 19 | Command | `ui/command.tsx` | native dialog + search + buttons | Done |
| 20 | Context Menu | `ui/context-menu.tsx` | popover action surface | Done |
| 21 | Data Table | `ui/table.tsx` | labelled scroll region + semantic table | Done |
| 22 | Date Picker | `ui/calendar.tsx` | native date input | Done |
| 23 | Dialog | `ui/dialog.tsx` | native `dialog` | Done |
| 24 | Direction | `ui/direction.tsx` | native `dir` attribute | Done |
| 25 | Drawer | `ui/drawer.tsx` | native dialog styled as edge surface | Done |
| 26 | Dropdown Menu | `ui/dropdown-menu.tsx` | Popover API + links/buttons | Done |
| 27 | Empty | `ui/empty.tsx` | labelled empty state + next action | Done |
| 28 | Field | `ui/field.tsx` | label/control/help/error grouping | Done |
| 29 | Hover Card | `ui/hover-card.tsx` | popover information card | Done |
| 30 | Input | `ui/input.tsx` | native input | Done |
| 31 | Input Group | `ui/input-group.tsx` | input + adjacent action | Done |
| 32 | Input OTP | `ui/input-otp.tsx` | labelled one-character inputs | Done |
| 33 | Item | `ui/item.tsx` | article/card composition | Done |
| 34 | Kbd | `ui/kbd.tsx` | native `kbd` | Done |
| 35 | Label | `ui/label.tsx` | native explicit label | Done |
| 36 | Marker | `ui/marker.tsx` | native `mark` | Done |
| 37 | Menubar | `ui/menubar.tsx` | labelled navigation with links | Done |
| 38 | Message | `ui/message.tsx` | status/message surface | Done |
| 39 | Message Scroller | `ui/message-scroller.tsx` | labelled focusable overflow region | Done |
| 40 | Native Select | `ui/native-select.tsx` | native `select` | Done |
| 41 | Navigation Menu | `ui/navigation-menu.tsx` | nav links + disclosure | Done |
| 42 | Pagination | `ui/pagination.tsx` | labelled nav + current link | Done |
| 43 | Popover | `ui/popover.tsx` | Popover API | Done |
| 44 | Progress | `ui/progress.tsx` | native `progress` | Done |
| 45 | Questionnaire | composition | form + fieldsets + live status | Done |
| 46 | Radio Group | `ui/radio-group.tsx` | fieldset + native radios | Done |
| 47 | Resizable | `ui/resizable.tsx` | native resize affordance | Done |
| 48 | Scroll Area | `ui/scroll-area.tsx` | labelled focusable overflow region | Done |
| 49 | Select | `ui/select.tsx` | native `select` | Done |
| 50 | Separator | `ui/separator.tsx` | native `hr` | Done |
| 51 | Sheet | `ui/sheet.tsx` | native dialog as drawer | Done |
| 52 | Sidebar | `ui/sidebar.tsx` | aside + navigation links | Done |
| 53 | Skeleton | `ui/skeleton.tsx` | labelled loading placeholder | Done |
| 54 | Slider | `ui/slider.tsx` | native range input | Done |
| 55 | Spinner | `ui/spinner.tsx` | progress/status loading pattern | Done |
| 56 | Switch | `ui/switch.tsx` | checkbox with switch presentation | Done |
| 57 | Table | `ui/table.tsx` | semantic table + responsive scroll | Done |
| 58 | Tabs | `ui/tabs.tsx` | tablist + tabs + panels | Done |
| 59 | Textarea | `ui/textarea.tsx` | native textarea | Done |
| 60 | Toast | `ui/sonner.tsx` | live status + timed dismiss enhancement | Done |
| 61 | Toggle | `ui/toggle.tsx` | button + `aria-pressed` | Done |
| 62 | Toggle Group | `ui/toggle-group.tsx` | grouped pressed buttons | CSS complete |
| 63 | Tooltip | `ui/tooltip.tsx` | native tooltip disclosure | Semantic done · CSS parity pending |
| 64 | Typography | composition | native heading/text elements | Semantic done · CSS parity pending |

## Meaning of “done”

The tracker has one gate: semantic capability. A row is complete when the consuming app can compose the behavior from native HTML and the small set of relationship primitives in this package.

The source project remains the reference for interaction intent and coverage. The implementation in this repository stays framework-agnostic and keeps product-specific state, sorting, filtering, chart engines, and rich application behavior with the consuming app.
