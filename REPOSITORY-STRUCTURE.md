# Submission Repository Structure

The course guideline requires a polyrepo structure with Git submodules for the final submission.

## Target layout

Create these separate repositories:

- `agrisense-config-server`
- `agrisense-eureka-server`
- `agrisense-api-gateway`
- `agrisense-device-service`
- `agrisense-sensor-data-service`
- `agrisense-alert-service`
- `agrisense-media-service`
- `agrisense-farm-dashboard`
- `agrisense-config-repo`

Then create one final submission repository, for example:

- `agrisense-cloud-submission`

Inside that final repo, add all others as Git submodules.

## Example final repo layout

```text
agrisense-cloud-submission/
  config-server/
  eureka-server/
  api-gateway/
  device-service/
  sensor-data-service/
  alert-service/
  media-service/
  farm-dashboard/
  config-repo/
  README.md
```

## Example commands

From inside the new submission repository:

```powershell
git submodule add https://github.com/YOUR_USERNAME/agrisense-config-server.git config-server
git submodule add https://github.com/YOUR_USERNAME/agrisense-eureka-server.git eureka-server
git submodule add https://github.com/YOUR_USERNAME/agrisense-api-gateway.git api-gateway
git submodule add https://github.com/YOUR_USERNAME/agrisense-device-service.git device-service
git submodule add https://github.com/YOUR_USERNAME/agrisense-sensor-data-service.git sensor-data-service
git submodule add https://github.com/YOUR_USERNAME/agrisense-alert-service.git alert-service
git submodule add https://github.com/YOUR_USERNAME/agrisense-media-service.git media-service
git submodule add https://github.com/YOUR_USERNAME/agrisense-farm-dashboard.git farm-dashboard
git submodule add https://github.com/YOUR_USERNAME/agrisense-config-repo.git config-repo
```

## Recommended split from the current repo

You currently have everything in one workspace. Before final submission, move each folder into its own repo:

- [config-server](C:\AgriSense Cloud\AgriSense Cloud\config-server)
- [eureka-server](C:\AgriSense Cloud\AgriSense Cloud\eureka-server)
- [api-gateway](C:\AgriSense Cloud\AgriSense Cloud\api-gateway)
- [device-service](C:\AgriSense Cloud\AgriSense Cloud\device-service)
- [sensor-data-service](C:\AgriSense Cloud\AgriSense Cloud\sensor-data-service)
- [alert-service](C:\AgriSense Cloud\AgriSense Cloud\alert-service)
- [media-service](C:\AgriSense Cloud\AgriSense Cloud\media-service)
- [farm-dashboard](C:\AgriSense Cloud\AgriSense Cloud\farm-dashboard)
- [config-repo](C:\AgriSense Cloud\AgriSense Cloud\config-repo)

The root repo you are using now is best treated as a development workspace, not the final submission structure.
