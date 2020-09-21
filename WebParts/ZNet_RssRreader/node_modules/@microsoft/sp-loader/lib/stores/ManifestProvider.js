import { SPHttpClient } from '@microsoft/sp-http';
import { Validate, _SPKillSwitch, Guid } from '@microsoft/sp-core-library';
import { PageContext } from '@microsoft/sp-page-context';
import { _TraceLogger, _LogSource, _QosMonitor } from '@microsoft/sp-diagnostics';
var ManifestProvider = (function () {
    function ManifestProvider(serviceScope, webAbsoluteUrl) {
        Validate.isNotNullOrUndefined(serviceScope, 'serviceScope');
        this._logSource = _LogSource.create('ManifestProvider');
        this._webAbsoluteUrl = webAbsoluteUrl;
        this._pageContext = serviceScope.consume(PageContext.serviceKey);
        this._httpClient = serviceScope.consume(SPHttpClient.serviceKey);
    }
    ManifestProvider.prototype.tryGetManifest = function (componentId, version) {
        var _this = this;
        if (!_SPKillSwitch.isActivated(Guid.parse('d961dd52-8860-4231-b655-5640fa363d3f'), '2018/10/09', 'Improve reliability of SP requests')) {
            return this.tryGetManifests([{ id: componentId, version: version }]);
        }
        else {
            var webUrl = (this._pageContext.web && this._pageContext.web.absoluteUrl) || this._webAbsoluteUrl;
            return this._httpClient.post(webUrl + ManifestProvider._restApiUrl, SPHttpClient.configurations.v1, {
                body: JSON.stringify(this._buildRequest(componentId, version))
            }).then(function (response) {
                if (!response.ok) {
                    throw new Error("GetClientSideComponents failed with HTTP status " + response.status);
                }
                return response.json().then(_this._extractManifests);
            }).catch(function (error) {
                _TraceLogger.logError(_this._logSource, error);
                throw error;
            });
        }
    };
    ManifestProvider.prototype.tryGetManifests = function (ids) {
        var _this = this;
        var qosMonitor = new _QosMonitor('ManifestProvider.tryGetManifests');
        var webUrl = (this._pageContext.web && this._pageContext.web.absoluteUrl) || this._webAbsoluteUrl;
        return this._httpClient.post(webUrl + ManifestProvider._restApiUrl, SPHttpClient.configurations.v1, {
            body: JSON.stringify({ components: ids })
        }).then(function (response) {
            if (!response.ok) {
                var error = new Error("GetClientSideComponents failed with HTTP status " + response.status);
                qosMonitor.writeUnexpectedFailure('UnsuccessfulResponse', error, { statusCode: response.status, correlationId: response.correlationId });
                throw error;
            }
            qosMonitor.writeSuccess({ correlationId: response.correlationId });
            return response.json().then(_this._extractManifests);
        }).catch(function (error) {
            _TraceLogger.logError(_this._logSource, error);
            qosMonitor.writeUnexpectedFailure(undefined, error);
            throw error;
        });
    };
    ManifestProvider.prototype._buildRequest = function (componentId, version) {
        return {
            components: [
                {
                    id: componentId,
                    version: version
                }
            ]
        };
    };
    ManifestProvider.prototype._extractManifests = function (response) {
        return response.value
            .filter(function (qr) { return qr.Status === 0 && !!qr.Manifest; }) 
            .map(function (qr) { return JSON.parse(qr.Manifest); }); 
    };
    ManifestProvider._restApiUrl = '/_api/web/GetClientSideComponents';
    return ManifestProvider;
}());
export default ManifestProvider;
